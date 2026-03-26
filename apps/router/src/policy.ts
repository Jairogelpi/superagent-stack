export type AgentTarget = "openclaw" | "openhands" | "deerflow" | "n8n";

export function routeTask(input: string): AgentTarget {
  const text = input.toLowerCase();

  const codingHints = [
    "bug",
    "repo",
    "pull request",
    "pr",
    "refactor",
    "test",
    "typescript",
    "python",
    "javascript",
    "fix",
    "compile",
    "dockerfile",
    "mcp"
  ];

  const researchHints = [
    "investiga",
    "research",
    "analiza",
    "hazme un informe",
    "hazme una presentación",
    "benchmark",
    "mercado",
    "competencia",
    "deck",
    "caso de uso"
  ];

  const workflowHints = [
    "cada día",
    "cada semana",
    "cron",
    "automatiza",
    "workflow",
    "webhook",
    "programa",
    "schedule",
    "recordatorio"
  ];

  if (codingHints.some((hint) => text.includes(hint))) {
    return "openhands";
  }

  if (researchHints.some((hint) => text.includes(hint))) {
    return "deerflow";
  }

  if (workflowHints.some((hint) => text.includes(hint))) {
    return "n8n";
  }

  return (process.env.ROUTER_DEFAULT_TARGET as AgentTarget) || "openclaw";
}
