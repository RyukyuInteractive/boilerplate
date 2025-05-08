import concurrently from "concurrently"

const concurrentlyResult = concurrently(
  [
    {
      command: "bun run --cwd api dev",
      name: "api 🐤",
      prefixColor: "yellow",
    },
    {
      command: "bun run --cwd app dev",
      name: "app 🐦",
      prefixColor: "blue",
    },
  ],
  {
    prefix: "{name}",
  },
)

try {
  await concurrentlyResult.result
} catch (error) {
  console.error(error)
}
