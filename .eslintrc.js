module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2019,
    sourceType: "module",
  },
  ignorePatterns: ["*.js", "*.jsx"],
  plugins: ["react-hooks", "unused-imports"],
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // "react/react-in-jsx-scope": "off",
    // "react/require-default-props": "off",
    // "react/function-component-definition": "off",
    // "import/order": [
    //   "warn",
    //   {
    //     pathGroups: [
    //       {
    //         pattern: "@/**",
    //         group: "internal",
    //       },
    //     ],
    //     groups: [
    //       ["builtin", "external"],
    //       "internal",
    //       ["parent", "sibling", "index"],
    //     ],
    //   },
    // ],
    // "import/extensions": [
    //   "error",
    //   "never",
    //   {
    //     ts: "never",
    //     tsx: "never",
    //     js: "never",
    //     jsx: "never",
    //     json: "none",
    //   },
    // ],
    // "object-curly-newline": "off",
    // "import/prefer-default-export": "off",
    // "jsx-a11y/click-events-have-key-events": "off",
    // "jsx-a11y/no-static-element-interactions": "off",
    // "react/jsx-props-no-spreading": "off",
    // "react/prop-types": "off",
    // "arrow-body-style": "off",
    // "no-nested-ternary": "off",
  },
  globals: {
    process: true,
  },
  env: {
    jest: true,
  },
};
