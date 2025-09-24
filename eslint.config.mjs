import eslint from "@eslint/js";
import prettierRecommended from "eslint-config-prettier";

export default [
  eslint.configs.recommended,
  prettierRecommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
