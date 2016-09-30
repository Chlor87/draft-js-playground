const path                    = require('path'),
      webpack                 = require('webpack'),
      FlowStatusWebpackPlugin = require('flow-status-webpack-plugin')//,
CopyWebpackPlugin = require('copy-webpack-plugin'),
  pkg = require('./package.json')

const ENV = process.env.NODE_ENV || 'development',
      IGNORED_VENDORS = [
        'webcomponents',
        'font-awesome'
      ]


module.exports = {
  context: path.join(__dirname),
  entry: {
    app: ['./src/js/index']//,
    //vendor: Object.keys(pkg.dependencies).filter(n => !IGNORED_VENDORS.includes(n))
  },
  output: {
    path: './public/dist',
    filename: '[name].js',
    publicPath: 'dist/'
  },
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.IgnorePlugin(/regenerator|nodent|js\-beautify/, /ajv/),
    new CopyWebpackPlugin([
      {
        context: 'public',
        from: '*.html',
        ignore: ['index.html']
      }
    ]),
    new FlowStatusWebpackPlugin()
  ],
  devServer: {
    contentBase: './public',
    port: 8080,
    inline: true,
    historyApiFallback: {
      index: 'index.html'
    },
    proxy: {
      '/auth*': {
        target: 'http://localhost:9999'
      },
      '/api*': {
        target: 'http://localhost:9999'
      }
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: [/node_modules/]
      },
      {test: /\.scss$/, loaders: ['style', 'css', 'sass']},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.html$/, loader: 'html'},
      {test: /\.(png|gif|jpg)$/, loader: 'url?limit=8192'},
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff2'
      },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file'},
      {test: /\.json$/, loader: 'json'}
    ],
  },
  resolve: {
    //root: path.resolve('./src/js'),
    //unsafeCache: true
  },
  devtool: ENV === 'production' ? 'cheap-module-source-map' : 'cheap-module-eval-source-map' //'source-map'
}
