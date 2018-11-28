const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssImport = require('postcss-import');
const cssMqpacker = require('css-mqpacker');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProd = options.mode === 'production';
  
  return {
    entry: './src/js/index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'script.js',
      publicPath: 'dist'
    },
    devServer: {
      open: isProd ? false : 'Chrome',
      overlay: true,
      progress: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.css'
      }),
      new CopyWebpackPlugin([
        {
          from: 'src/img',
          to: 'img',
          cache: true
        }
      ], {
        debug: 'info'
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules'
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: isProd ? [
                  postcssImport(),
                  cssMqpacker(),
                  autoprefixer({
                    browsers: ['> 0.5%', 'last 2 Chrome versions', 'Firefox >= 56', 'ie >= 11', 'not dead']
                  }),
                  cssnano()
                ] : [
                  postcssImport(),
                  cssMqpacker(),
                  autoprefixer({
                    browsers: ['> 0.5%', 'last 2 Chrome versions', 'Firefox >= 56', 'ie >= 11', 'not dead']
                  })
                ]
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },
    devtool: isProd ? false : 'eval-sourcemap'
  }
};