import { readFileSync, existsSync } from "node:fs";
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
  "agents/DECISIONS.md",
  "agents/SITE.md",
  "agents/REFERENCES.md",
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
  if (!existsSync(resolve(root, path))) failures.push(`Missing required file: ${path}`);
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

const tickets = read("agents/TICKETS.md");
const ticketHeadingMatches = [...tickets.matchAll(/^## (PORT-\d{3}) — (.+)$/gm)];
const ticketIds = ticketHeadingMatches.map((match) => match[1]);

if (new Set(ticketIds).size !== ticketIds.length) {
  failures.push("agents/TICKETS.md contains duplicate ticket detail IDs");
}

const tableSection = tickets.split("## Ordered backlog")[1]?.split(/^## PORT-/m)[0] ?? "";
const tableIds = [...tableSection.matchAll(/\| (PORT-\d{3}) \|/g)].map((match) => match[1]);

for (const id of ticketIds) {
  if (!tableIds.includes(id)) failures.push(`${id} has detail but is missing from the backlog table`);
}
for (const id of tableIds) {
  if (!ticketIds.includes(id)) failures.push(`${id} is in the backlog table but has no detail block`);
}

const allowedStatuses = new Set(["Ready", "In progress", "Blocked", "Done"]);
const allowedPriorities = new Set(["P0", "P1", "P2", "P3"]);

for (let index = 0; index < ticketHeadingMatches.length; index += 1) {
  const match = ticketHeadingMatches[index];
  const start = match.index;
  const end = ticketHeadingMatches[index + 1]?.index ?? tickets.length;
  const block = tickets.slice(start, end);
  const id = match[1];
  const status = block.match(/^- Status: (.+)$/m)?.[1];
  const priority = block.match(/^- Priority: (.+)$/m)?.[1];

  if (!allowedStatuses.has(status)) failures.push(`${id} has invalid or missing status: ${status ?? "missing"}`);
  if (!allowedPriorities.has(priority)) failures.push(`${id} has invalid or missing priority: ${priority ?? "missing"}`);
  if (!/^### Acceptance criteria$/m.test(block)) failures.push(`${id} is missing acceptance criteria`);
  if (status === "Blocked" && !/^- Blocker:|^- Depends on:.*owner/m.test(block)) {
    failures.push(`${id} is blocked but does not state an owner-facing blocker`);
  }
  if (status === "Done" && !/^- Completed: \d{4}-\d{2}-\d{2}$/m.test(block)) {
    failures.push(`${id} is done but has no completion date`);
  }
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
const decisionIds = [...decisions.matchAll(/^## (ADR-\d{3}) —/gm)].map((match) => match[1]);
if (new Set(decisionIds).size !== decisionIds.length) {
  failures.push("agents/DECISIONS.md contains duplicate decision IDs");
}

if (failures.length > 0) {
  console.error("Agent system check failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Agent system check passed (${ticketIds.length} tickets, ${decisionIds.length} decisions, ${mountedComponents.length} page components).`);
}
