module.exports = {
  extends: ['plugin:react-hooks/recommended', 'airbnb-typescript', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/require-default-props': 'off',
    'react-hooks/exhaustive-deps': 1,
    'no-async-promise-executor': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/href-no-hash': ['off'],
    'jsx-a11y/label-has-associated-control': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }],
    'react/no-array-index-key': 'off',
  },
};
