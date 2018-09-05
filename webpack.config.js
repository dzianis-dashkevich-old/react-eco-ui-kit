const { resolve } = require('path');

const src = resolve(__dirname, 'src');
const indexJs = resolve(src, 'index.js');
const dist = resolve(__dirname, 'dist');

const uiKitUtils = resolve(src, 'utils');
const uiKitComponents = resolve(src, 'components');

console.log(uiKitComponents);

const entry = indexJs;
const output = {
	path: dist,
	filename: 'bundle.js',
	library: 'MYAWESOME',
	libraryTarget: 'umd'
};

module.exports = {
	entry,
	output,
	resolve: {
		alias: {
			uiKitUtils,
			uiKitComponents,
		},
		extensions: ['.js', '.jsx'],
		modules: ['node_modules', src],
	},
	module: {
		rules: [
			{
				test: src,
				use: 'babel-loader',
			}
		]
	},
	mode: 'development'
};

