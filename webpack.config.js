const { resolve } = require('path');

const src = resolve(__dirname, 'src');
const indexJs = resolve(src, 'index.js');
const dist = resolve(__dirname, 'dist');

const entry = indexJs;
const output = { path: dist, filename: 'bundle.js' };

module.exports = {
	entry,
	output,
	module: {
		rules: [
			{
				test: indexJs,
				use: 'babel-loader',
			}
		]
	}
};

