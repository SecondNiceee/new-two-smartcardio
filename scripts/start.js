// Cross-platform start script — works on Windows (cmd.exe) and Linux/macOS.
// Set HOST and PORT environment variables to override the defaults.
const { spawnSync } = require("child_process")

const mode = process.argv[2] === "dev" ? "dev" : "start"
const host = process.env.HOST || "127.0.0.1"
const port = process.env.PORT || "3000"

const result = spawnSync(
  "next",
  [mode, "--hostname", host, "--port", port],
  { stdio: "inherit", shell: true }
)

process.exit(result.status ?? 0)
