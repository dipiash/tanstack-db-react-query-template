import nimbusCleanPlugin from 'eslint-plugin-nimbus-clean'
import globals from 'globals'
import tsLint from 'typescript-eslint'

export default tsLint.config(
  ...nimbusCleanPlugin.configs.recommended,
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    settings: {
      'import/resolver': {
        node: true,
        typescript: true,
      },
    },
  },
)
