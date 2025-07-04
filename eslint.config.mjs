import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "src/generated/**/*",  // Ignorar arquivos gerados pelo Prisma
      ".next/**/*",          // Ignorar arquivos de build
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error" // Reativar a regra para proibir o uso de any
    }
  }
];

export default eslintConfig;
