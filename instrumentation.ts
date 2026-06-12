export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startTokenRefreshLoop } = await import("./lib/cdek-token")
    startTokenRefreshLoop()
  }
}
