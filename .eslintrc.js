module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/href-no-hash': ['off'],
    'jsx-a11y/label-has-associated-control': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
  },
  overrides: [
    {
      files: ['src/containers/**/*.jsx'],
      rules: {
        'react/prop-types': 0
      }
    }
  ]
};
