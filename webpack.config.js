const { resolve } = require('path');

const src = resolve(__dirname, 'src');
const indexJs = resolve(src, 'index.js');
const dist = resolve(__dirname, 'dist');

const entry = indexJs;
const output = { path: dist, filename: 'bundle.js' };

module.exports = {
	entry,
	output,
	resolve: {
		alias: {
			uiKitUtils: resolve(src, 'utils'),
			uiKitComponents: resolve(src, 'components')
		},
		extensions: ['js', 'jsx'],
		modules: ['node_modules', src],
	},
	module: {
		rules: [
			{
				test: indexJs,
				use: 'babel-loader',
			}
		]
	},
	mode: 'production'
};

