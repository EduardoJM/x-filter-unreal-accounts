const path = require('path');

module.exports = {
  entry: {
    'scripts/filter': './src/scripts/filter.ts',
    'pages/options': './src/pages/options.ts',
  },
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
    path: __dirname,
    filename: '[name].js',
  },
};
