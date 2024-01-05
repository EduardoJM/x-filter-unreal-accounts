const path = require('path');

module.exports = {
  entry: './src/scripts/filter.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'filter.js',
    path: path.resolve(__dirname, 'scripts'),
  },
};
