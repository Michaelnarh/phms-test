module.exports = {
	entry: "./src/index.js",
	output: {
		path: __dirname + "/dist",
		publicPath: "/",
		filename: "bundle.js",
	},
	devServer: {
		contentBase: "./dist",
	},
	resolve: {
		extensions: [".js", ".jsx"],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
		],
	},
};
