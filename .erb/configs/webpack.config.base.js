/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import webpackPaths from './webpack.paths.js';
import { dependencies as externals } from '../../build/app/package.json';

export default {
  externals: [...Object.keys(externals || {})],

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  output: {
    path: webpackPaths.srcPath,
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: 'commonjs2',
    },
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        REACT_TODO_API_IVO: JSON.stringify(process.env.REACT_TODO_API_IVO),
        REACT_TODO_API_MARGI: JSON.stringify(process.env.REACT_TODO_API_MARGI),
        REACT_APP_FORECAST_APP_ID: JSON.stringify(
          process.env.REACT_APP_FORECAST_APP_ID
        ),
      },
    }),
  ],
};
