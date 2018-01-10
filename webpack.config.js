const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpg|gif|ttf|otf|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: '/',
                outputPath: 'src/'
              }
            }
          }
        ]
      }
    ]
  }
};