export const config = {
  root: ".ai",
  sheet: {
    feature: "features.csv",
    mutation: "mutations.csv",
    page: {
      path: "pages.csv",
    },
  },
  directories: {
    appRoutes: "app/interface/routes",
    apiMutations: "api/interface/mutation-fields",
  },
  rule: {
    directories: [".clinerules", ".github/copilot-instructions.md"],
  },
  product: {
    path: "product.md",
  },
}
