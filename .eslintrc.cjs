/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["./libs/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
