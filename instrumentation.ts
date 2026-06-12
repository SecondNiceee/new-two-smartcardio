export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const host = process.env.HOST ?? "127.0.0.1"
    const port = process.env.PORT ?? "3000"
    console.log(`[server] Next.js запущен на http://${host}:${port} (HOST=${host}, PORT=${port})`)

    const { startTokenRefreshLoop } = await import("./lib/cdek-token")
    startTokenRefreshLoop()
  }
}
