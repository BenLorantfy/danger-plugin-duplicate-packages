// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import { DangerDSLType } from "../node_modules/danger/distribution/dsl/DangerDSL"
declare var danger: DangerDSLType
declare function message(message: string): void
declare function warn(message: string): void
declare function fail(message: string): void

const child_process = require("child_process")

/**
 * @see: https://github.com/orta/danger-plugin-yarn/blob/master/src/index.ts#L72
 */
export async function checkDuplicatePackages(options: { packageNames: string[]; appendedMessage?: string }) {
  await Promise.all(
    options.packageNames.map(packageName => {
      return new Promise<void>((resolve, reject) => {
        child_process.exec(`yarn why '${packageName}' --json`, (err, output) => {
          if (err) {
            reject(new Error("checkDuplicatePackages failed while trying to run yarn why"))
          }
          if (!output) {
            return
          }

          // console.log("output", output);
          // Comes as a series of little JSON messages
          const usefulJSONContents = output
            .toString()
            .split(`{"type":"activityEnd","data":{"id":0}}`)
            .pop()
          const asJSON = usefulJSONContents.split("}\n{").join("},{")

          const whyJSON = JSON.parse(`[${asJSON}]`)
          const messages = whyJSON.filter(msg => typeof msg.data === "string").map(m => m.data)

          if (doMessageIndicateDuplicates(messages)) {
            const messagesStr = messages.join("\n")
            fail(
              `Found multiple copies of ${packageName} installed.${
                options.appendedMessage ? "  " + options.appendedMessage : ""
              }\n <details><summary>See \`yarn why ${packageName}\` output</summary><p>\n\n\`\`\`\n${messagesStr}\n\`\`\`\n</p>`,
            )
          }

          resolve()
        })
      })
    }),
  )
}

function doMessageIndicateDuplicates(yarnWhyOutput) {
  const foundMessages = yarnWhyOutput.filter(msg => msg.includes("Found"))
  return foundMessages.length > 1
}
