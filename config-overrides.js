const { override, addWebpackAlias } = require('customize-cra');
const path = require('path')
console.log(path.resolve(__dirname, './src'))
module.exports = override(
    addWebpackAlias({
        assets: path.resolve(__dirname, './src/assets'),
        components: path.resolve(__dirname, './src/components'),
        pages: path.resolve(__dirname, './src/pages'),
        common: path.resolve(__dirname, './src/common'),
        "@": path.resolve(__dirname, './src')
    })
);