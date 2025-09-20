// eslint.config.mjs
import eslint from "@eslint/js";
import prettierRecommended from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import globals from "globals";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // 1) 基本掃描範圍與語言環境
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["node_modules/**", "dist/**", "build/**", ".next/**", "coverage/**"],
    languageOptions: {
      ecmaVersion: "latest",
      // 你目前後端用的是 CommonJS（require），所以用 "script"
      sourceType: "script",
      globals: {
        ...globals.node, // 讓 Node 全域變數可用
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        process: "readonly",
        console: "readonly",
      },
    },
  },

  // 2) 官方推薦規則（注意：這裡是「單一物件」，不要用 ... 展開）
  eslint.configs.recommended,

  // 3) 關閉與 Prettier 衝突的規則（flat-config 版）
  prettierRecommended,

  // 4) 讓 ESLint 直接跑 Prettier，統一排版
  {
    plugins: { prettier: pluginPrettier },
    rules: {
      "prettier/prettier": "warn",
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-console": "off", // 後端常用 console
    },
  },
];
