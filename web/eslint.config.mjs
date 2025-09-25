// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  { // 忽略資料夾
    ignores: ["**/node_modules/**", "**/.next/**", "**/dist/**", "**/build/**", "**/coverage/**"]
  },

  js.configs.recommended,         // JS 推薦規則
  ...tseslint.configs.recommended, // TS 推薦規則（非 type-aware，夠用了）

  { // 讓 TS/TSX 能被正確解析（重點！）
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      },
      globals: { ...globals.browser, ...globals.node }
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }]
    }
  },

  { // 讓 JS/JSX 也用 module + JSX
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: { jsx: true },
      globals: { ...globals.browser, ...globals.node }
    }
  },

  { // 與 Prettier 和平相處
    rules: { "prettier/prettier": "off" }
  }
];
