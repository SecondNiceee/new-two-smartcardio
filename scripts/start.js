// Cross-platform start script — works on Windows (cmd.exe) and Linux/macOS.
// Set HOST and PORT environment variables to override the defaults.
const { spawnSync } = require("child_process")

const mode = process.argv[2] === "dev" ? "dev" : "start"

// Load .env / .env.local / .env.development(.local) etc. into process.env,
// because Node does NOT read them automatically — only Next.js does at runtime.
// @next/env ships with Next, so no extra dependency is required.
try {
  const { loadEnvConfig } = require("@next/env")
  loadEnvConfig(process.cwd(), mode === "dev")
} catch (err) {
  console.warn("[start] Could not load env files via @next/env:", err.message)
}

const host = process.env.HOST || "127.0.0.1"
const port = process.env.PORT || "3000"

const result = spawnSync(
  "next",
  [mode, "--hostname", host, "--port", port],
  { stdio: "inherit", shell: true }
)

process.exit(result.status ?? 0)
