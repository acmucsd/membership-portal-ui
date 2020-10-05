const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#62B0FF',
      '@success-color': '#22ACEA',
      '@text-selection-bg': '#22ACEA',
      '@link-color': '#22ACEA',
    },
  }),
);
