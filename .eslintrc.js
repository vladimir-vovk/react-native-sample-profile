module.exports = {
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    semi: [2, 'never'],
    'no-shadow': 1,
    'operator-linebreak': 0,
    'lines-between-class-members': [
      2,
      'always',
      { exceptAfterSingleLine: true }
    ],
    'object-curly-newline': 'off',
    'arrow-parens': [2, 'as-needed'],
    'comma-dangle': [2, 'never'],
    'no-useless-escape': 1,
    'no-underscore-dangle': [
      2,
      { allowAfterThis: true, enforceInMethodNames: true }
    ],
    'react/state-in-constructor': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
    ],
    'import/no-extraneous-dependencies': [
      2,
      { devDependencies: ['**/test.tsx', '**/test.ts'] }
    ],
    '@typescript-eslint/indent': [2, 2],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-explicit-any': 1
  }
}
