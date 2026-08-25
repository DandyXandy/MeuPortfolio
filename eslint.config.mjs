// Flat config (ESLint 9) — la forma correcta para Next.js 16, según la
// propia documentación empaquetada con el framework instalado acá
// (node_modules/next/dist/docs/.../03-eslint.md). El viejo `.eslintrc.json`
// + `next lint` queda deprecado; ahora se corre el CLI de ESLint directo.
import coreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
  ...coreWebVitals,
  ...nextTypescript,
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**'],
  },
  {
    // next.config.js es CommonJS a propósito (Next todavía lo carga así
    // antes de que exista cualquier transpilación) — el require() acá
    // no es un descuido, es el formato correcto para este archivo puntual.
    files: ['next.config.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];

export default eslintConfig;
