/**
 * Shared configuration
 */
const autoprefixer = require('autoprefixer'),
  path = require('path'),
  webpack = require('webpack');

const webpackConfig = {
  entry: './src/js/main.jsx',

  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?importLoaders=1!postcss-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=10000&hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        loader: "babel-loader",

        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, "src")
        ],

        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/
      }
    ]
  },

  devtool: "source-map",

  postcss: function () {
    return [autoprefixer];
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    openpgp: 'openpgp'
  }
};

module.exports = webpackConfig;