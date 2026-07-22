import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");
const failures = [];

const requiredFiles = [
  "AGENTS.md",
  "agents/AGENTS.md",
  "agents/README.md",
  "agents/TICKETS.md",
  "agents/REVIEW-QUESTIONS.md",
  "agents/DECISIONS.md",
  "agents/SITE.md",
  "agents/REFERENCES.md",
  "agents/ticket",
  "agents/templates/TICKET.md",
  "agents/knowledge-base/README.md",
  "agents/knowledge-base/PROFILE.md",
  "agents/knowledge-base/CURRENT.md",
  "agents/knowledge-base/EXPERIENCE.md",
  "agents/knowledge-base/EDUCATION.md",
  "agents/knowledge-base/PROJECTS.md",
  "agents/knowledge-base/SKILLS.md",
  "agents/knowledge-base/INTERESTS.md",
  "agents/knowledge-base/BRAND.md",
];

for (const path of requiredFiles) {
  if (!existsSync(resolve(root, path))) failures.push(`Missing required path: ${path}`);
}

const compatibilityFiles = [
  ".agents/AGENTS.md",
  ".cursorrules",
  ".github/copilot-instructions.md",
  "CLAUDE.md",
];

for (const path of compatibilityFiles) {
  const contents = read(path);
  if (!contents.includes("agents/AGENTS.md")) {
    failures.push(`${path} must point to agents/AGENTS.md`);
  }
  if (contents.length > 2_000) {
    failures.push(`${path} looks like a duplicated prompt; keep it as a short pointer`);
  }
}

const rawTodo = read("TODO");
if (/^\s*\[[ xX]\]/m.test(rawTodo)) {
  failures.push("TODO contains an active checkbox; migrate it to agents/TICKETS.md");
}

const reviewQuestions = read("agents/REVIEW-QUESTIONS.md");
const reviewQuestionIds = [...reviewQuestions.matchAll(/^## (RQ-\d{3}) —/gm)].map((match) => match[1]);
const reviewQuestionAnchors = [...reviewQuestions.matchAll(/^<a id="(rq-\d{3})"><\/a>$/gm)].map((match) =>
  match[1].toUpperCase(),
);

if (new Set(reviewQuestionIds).size !== reviewQuestionIds.length) {
  failures.push("agents/REVIEW-QUESTIONS.md contains duplicate question IDs");
}
for (const questionId of reviewQuestionIds) {
  if (!reviewQuestionAnchors.includes(questionId)) {
    failures.push(`${questionId} is missing its stable review-question anchor`);
  }
}

const ticketsIndex = read("agents/TICKETS.md");
const indexRecords = [];

for (const line of ticketsIndex.split("\n")) {
  const match = line.match(
    /\[(PORT-\d{3}) — ([^\]]+)\]\(ticket\/(PORT-\d{3})\.md\)/,
  );
  if (!match || !line.startsWith("|")) continue;

  const cells = line.split("|").map((cell) => cell.trim());
  const isActive = /^\d+$/.test(cells[1]);
  indexRecords.push({
    id: match[1],
    title: match[2],
    targetId: match[3],
    priority: isActive ? cells[3] : cells[2],
    status: isActive ? cells[4] : "Done",
    dependencies: isActive ? cells[5] : undefined,
    active: isActive,
  });
}

const indexedIds = indexRecords.map((record) => record.id);
if (new Set(indexedIds).size !== indexedIds.length) {
  failures.push("agents/TICKETS.md contains duplicate ticket rows");
}

const ticketFiles = readdirSync(resolve(root, "agents/ticket"))
  .filter((name) => /^PORT-\d{3}\.md$/.test(name))
  .sort();
const fileIds = ticketFiles.map((name) => name.replace(/\.md$/, ""));

for (const id of indexedIds) {
  if (!fileIds.includes(id)) failures.push(`${id} is indexed but agents/ticket/${id}.md is missing`);
}
for (const id of fileIds) {
  if (!indexedIds.includes(id)) failures.push(`agents/ticket/${id}.md exists but is missing from TICKETS.md`);
}

const markdownFiles = [
  "README.md",
  ...requiredFiles.filter((path) => path.endsWith(".md")),
  ...ticketFiles.map((name) => `agents/ticket/${name}`),
];

for (const path of new Set(markdownFiles)) {
  const contents = read(path);
  for (const match of contents.matchAll(/\]\(([^)]+)\)/g)) {
    const link = match[1].replace(/^<|>$/g, "");
    if (/^(?:https?:|mailto:|#)/.test(link)) continue;
    const target = link.split("#")[0];
    if (!target) continue;
    if (!existsSync(resolve(root, dirname(path), target))) {
      failures.push(`${path} links to missing local path ${link}`);
    }
  }
}

const allowedStatuses = new Set(["Ready", "In progress", "Blocked", "Done"]);
const allowedPriorities = new Set(["P0", "P1", "P2", "P3"]);
const fileRecords = new Map();

for (const fileName of ticketFiles) {
  const path = `agents/ticket/${fileName}`;
  const contents = read(path);
  const heading = contents.match(/^# (PORT-\d{3}) — (.+)$/m);
  const id = fileName.replace(/\.md$/, "");
  const status = contents.match(/^- Status: (.+)$/m)?.[1];
  const priority = contents.match(/^- Priority: (.+)$/m)?.[1];
  const dependencies = contents.match(/^- Depends on: (.+)$/m)?.[1];
  const title = heading?.[2];

  fileRecords.set(id, { status, priority, dependencies, title });

  if (heading?.[1] !== id) failures.push(`${path} has a missing or mismatched H1 ticket ID`);
  if (!allowedStatuses.has(status)) failures.push(`${id} has invalid or missing status: ${status ?? "missing"}`);
  if (!allowedPriorities.has(priority)) failures.push(`${id} has invalid or missing priority: ${priority ?? "missing"}`);
  if (!/^## Acceptance criteria$/m.test(contents)) failures.push(`${id} is missing an H2 acceptance-criteria section`);
  if (!/^## Validation record$/m.test(contents)) failures.push(`${id} is missing an H2 validation-record section`);

  if (status === "Blocked") {
    if (!/^- Blocker: .+$/m.test(contents)) failures.push(`${id} is blocked but has no concrete blocker`);
    const approvalLine = contents.match(/^- Required approvals: (.+)$/m)?.[1];
    if (!approvalLine) {
      failures.push(`${id} is blocked but has no Required approvals field`);
    } else if (approvalLine !== "none") {
      const links = [...approvalLine.matchAll(/\[(RQ-\d{3})\]\(\.\.\/REVIEW-QUESTIONS\.md#(rq-\d{3})\)/g)];
      if (links.length === 0) failures.push(`${id} has an invalid required-approval link`);
      for (const link of links) {
        const label = link[1];
        const anchor = link[2].toUpperCase();
        if (label !== anchor) failures.push(`${id} labels ${label} but links to ${anchor}`);
        if (!reviewQuestionIds.includes(label)) failures.push(`${id} links to missing review question ${label}`);
      }
    }
  }

  if (status === "Done" && !/^- Completed: \d{4}-\d{2}-\d{2}$/m.test(contents)) {
    failures.push(`${id} is done but has no completion date`);
  }
}

for (const record of indexRecords) {
  if (record.id !== record.targetId) {
    failures.push(`${record.id} index row links to ${record.targetId}.md`);
  }
  const fileRecord = fileRecords.get(record.id);
  if (!fileRecord) continue;
  if (record.title !== fileRecord.title) {
    failures.push(`${record.id} title differs between TICKETS.md and its ticket file`);
  }
  if (record.priority !== fileRecord.priority) {
    failures.push(`${record.id} priority differs between TICKETS.md and its ticket file`);
  }
  if (record.status !== fileRecord.status) {
    failures.push(`${record.id} status differs between TICKETS.md and its ticket file`);
  }
  if (record.active && record.dependencies !== fileRecord.dependencies) {
    failures.push(`${record.id} dependencies differ between TICKETS.md and its ticket file`);
  }
}

const activeRecords = indexRecords.filter((record) => record.active);
const firstReady = activeRecords.find((record) => record.status === "Ready");
const readySection = ticketsIndex.split("Current ready sequence by priority and table order:")[1]?.split("## Ordered active backlog")[0] ?? "";
const declaredReadySequence = [...readySection.matchAll(/\[(PORT-\d{3})\]\(ticket\/PORT-\d{3}\.md\)/g)].map(
  (match) => match[1],
);
const actualReadySequence = activeRecords.filter((record) => record.status === "Ready").map((record) => record.id);
const declaredNext = ticketsIndex.match(
  /\*\*Next eligible ticket:\*\* \[(PORT-\d{3}) —/,
)?.[1];

if (!declaredNext) {
  failures.push("agents/TICKETS.md does not declare the next eligible ticket");
} else if (firstReady?.id !== declaredNext) {
  failures.push(
    `TICKETS.md declares ${declaredNext} next, but the first Ready row is ${firstReady?.id ?? "missing"}`,
  );
}
if (JSON.stringify(declaredReadySequence) !== JSON.stringify(actualReadySequence)) {
  failures.push("TICKETS.md ready sequence does not match the Ready rows in table order");
}

for (const match of reviewQuestions.matchAll(/\[PORT-\d{3}\]\(ticket\/(PORT-\d{3})\.md\)/g)) {
  if (!fileIds.includes(match[1])) failures.push(`REVIEW-QUESTIONS.md links to missing ticket ${match[1]}`);
}

const page = read("src/app/page.tsx");
const main = page.match(/<main>([\s\S]*?)<\/main>/)?.[1] ?? "";
const mountedComponents = [...main.matchAll(/<([A-Z][A-Za-z0-9]*)\s*\/>/g)].map((match) => match[1]);
const site = read("agents/SITE.md");

for (const component of mountedComponents) {
  if (!site.includes(`\`${component}\``)) {
    failures.push(`agents/SITE.md does not document mounted component ${component}`);
  }
}

const decisions = read("agents/DECISIONS.md");
const decisionHeadings = [...decisions.matchAll(/^## (ADR-\d{3}) —/gm)];
const decisionIds = decisionHeadings.map((match) => match[1]);
if (new Set(decisionIds).size !== decisionIds.length) {
  failures.push("agents/DECISIONS.md contains duplicate decision IDs");
}
const allowedDecisionStatuses = new Set(["Proposed", "Accepted", "Rejected", "Superseded"]);
for (let index = 0; index < decisionHeadings.length; index += 1) {
  const start = decisionHeadings[index].index;
  const end = decisionHeadings[index + 1]?.index ?? decisions.length;
  const block = decisions.slice(start, end);
  const status = block.match(/^- Status: (.+)$/m)?.[1];
  if (!allowedDecisionStatuses.has(status)) {
    failures.push(`${decisionIds[index]} has invalid or missing status: ${status ?? "missing"}`);
  }
}

if (failures.length > 0) {
  console.error("Agent system check failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Agent system check passed (${fileIds.length} ticket files, ${activeRecords.length} active, ${decisionIds.length} decisions, ${mountedComponents.length} page components).`,
  );
}
