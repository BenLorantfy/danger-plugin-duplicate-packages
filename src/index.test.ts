import { checkDuplicatePackages } from "./index"

declare const global: any

describe("checkDuplicatePackages()", () => {
  beforeEach(() => {
    global.warn = jest.fn()
    global.message = jest.fn()
    global.fail = jest.fn()
    global.markdown = jest.fn()
  })

  afterEach(() => {
    global.warn = undefined
    global.message = undefined
    global.fail = undefined
    global.markdown = undefined
  })

  it("should produce no errors", async () => {
    global.danger = {
      // https://danger.systems/js/reference.html#GitDSL
      git: {
        commits: [
          {
            message: "Add package",
            sha: "123456",
          },
        ],
      },
    }

    await checkDuplicatePackages({
      packageNames: ["ansi-regex"],
    })

    expect(global.fail).toBeCalledWith(expect.stringContaining("Found multiple copies of ansi-regex installed"))
  })
})
