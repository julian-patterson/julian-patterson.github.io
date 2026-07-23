type GitHubContributionDay = {
  contributionCount: number;
  date: string;
};

type GitHubContributionWeek = {
  contributionDays: GitHubContributionDay[];
};

type GitHubCalendar = {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
};

type GitHubGraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: GitHubCalendar;
      };
    } | null;
  };
  errors?: unknown[];
};

export const dynamic = "force-static";

const unavailableResponse = (generatedAt: string) =>
  Response.json({
    status: "unavailable",
    generatedAt,
  });

export async function GET() {
  const generatedAt = new Date().toISOString();
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "julian-patterson";

  if (!token) {
    return unavailableResponse(generatedAt);
  }

  const query = `
    query PortfolioContributionCalendar($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      return unavailableResponse(generatedAt);
    }

    const result = (await response.json()) as GitHubGraphQLResponse;
    const calendar = result.data?.user?.contributionsCollection?.contributionCalendar;

    const calendarIsValid =
      calendar &&
      Number.isFinite(calendar.totalContributions) &&
      Array.isArray(calendar.weeks) &&
      calendar.weeks.every(
        (week) =>
          Array.isArray(week.contributionDays) &&
          week.contributionDays.every(
            (day) => Number.isFinite(day.contributionCount) && typeof day.date === "string"
          )
      );

    if (result.errors?.length || !calendarIsValid) {
      return unavailableResponse(generatedAt);
    }

    const sanitizedCalendar = {
      totalContributions: Math.max(0, Math.trunc(calendar.totalContributions)),
      weeks: calendar.weeks.map((week) => ({
        contributionDays: week.contributionDays.map((day) => ({
          contributionCount: Math.max(0, Math.trunc(day.contributionCount)),
          date: day.date,
        })),
      })),
    };

    return Response.json({
      status: "available",
      generatedAt,
      username,
      calendar: sanitizedCalendar,
    });
  } catch {
    return unavailableResponse(generatedAt);
  }
}
