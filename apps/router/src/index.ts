import express from "express";
import { z } from "zod";
import { routeTask } from "./policy.js";
import { getUpstream } from "./upstreams.js";

const app = express();
app.use(express.json({ limit: "1mb" }));

const dispatchSchema = z.object({
  input: z.string().min(1),
  metadata: z.record(z.string(), z.any()).optional()
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "superagent-router" });
});

app.get("/routes", (_req, res) => {
  res.json({
    openclaw: getUpstream("openclaw"),
    openhands: getUpstream("openhands"),
    deerflow: getUpstream("deerflow"),
    n8n: "http://n8n:5678"
  });
});

app.post("/dispatch", (req, res) => {
  const parsed = dispatchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: parsed.error.flatten() });
  }

  const target = routeTask(parsed.data.input);
  return res.json({
    ok: true,
    target,
    upstream: getUpstream(target),
    input: parsed.data.input
  });
});

const port = Number(process.env.ROUTER_PORT || 8080);
app.listen(port, "0.0.0.0", () => {
  console.log(`superagent-router listening on ${port}`);
});
