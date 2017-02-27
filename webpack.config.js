module.exports = {
  entry: './src/example.ts',
  output: {
    path: __dirname + '/build/web',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: __dirname + '/public',
    port: 9000
  }
};
