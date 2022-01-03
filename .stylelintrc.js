module.exports = {
  customSyntax: 'postcss-less',
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-order'],
  rules: {
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-alphabetical-order': true,
    'font-weight-notation': 'numeric',
    'selector-class-pattern': '^([a-zA-z][a-zA-z0-9]*)([\-\_]+[a-zA-z0-9]+)*$' 
  },
};
