import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/**", "node_modules/**", ".eslintrc.cjs"] },
  {
    extends: [
      js.configs.recommended,
      ...react.configs.flat.recommended,
      ...react.configs.flat["jsx-runtime"],
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        project: "./tsconfig.json",
      },
    },

    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
);
