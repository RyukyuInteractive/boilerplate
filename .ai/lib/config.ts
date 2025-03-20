export const config = {
  root: ".ai",
  path: {
    pages: ".ai/pages.csv",
    features: ".ai/features.csv",
    mutations: ".ai/mutations.csv",
    rules: ".ai/rules",
    cursorRules: ".cursor/rules",
    productMarkdown: "product.md",
    vscodeSettings: ".vscode/settings.json",
    copilotInstructionsCommitMessageGeneration:
      ".github/copilot-instructions.commit-message-generation.md",
    copilotInstructionsPullRequestDescriptionGeneration:
      ".github/copilot-instructions.pull-request-description-generation.md",
    copilotInstructionsReviewSelection:
      ".github/copilot-instructions.review-selection.md",
    copilotInstructionsTestGeneration:
      ".github/copilot-instructions.test-generation.md",
  },
  project: {
    appRoutes: "app/interface/routes",
    apiMutations: "api/interface/mutation-fields",
  },
  instructions: {
    output: ".ai/00.output.mdc",
    workflow: ".ai/01.workflow.mdc",
    memory: ".ai/02.memory.mdc",
    code: ".ai/03.code.mdc",
    commitMessage: ".ai/04.commit-message.mdc",
    pullRequestDescription: ".ai/05.pull-request-description.mdc",
    review: ".ai/06.review.mdc",
    test: ".ai/07.test.mdc",
    overview: ".ai/10.overview.mdc",
    directories: ".ai/11.directories.mdc",
    libraries: ".ai/12.libraries.mdc",
    commands: ".ai/13.commands.mdc",
    methods: ".ai/14.methods.mdc",
  },
}
