import HtmlWebpackPlugin from 'html-webpack-plugin';
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin';

export const mode = 'development';
export const devServer = {
  port: 8082,
};
export const module = {
  rules: [
    {
      /* The following line to ask babel
           to compile any file with extension
           .js */
      test: /\.js?$/,

      /* exclude node_modules directory from babel.
          Babel will not compile any files in this directory*/
      exclude: /node_modules/,

      // To Use babel Loader
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env' /* to transfer any advansed ES to ES5 */,
          '@babel/preset-react',
        ], // to compile react to ES5
      },
    },
  ],
};
export const plugins = [
  new ModuleFederationPlugin(
    {
      name: 'MFE2',
      filename: 'remoteEntry.js',
      remotes: {
        MFE1: 'MFE1@http://localhost:3000/mfe1/dist/remoteEntry.js',
      },
    }
  ),
  new HtmlWebpackPlugin({
    template: './public/index.html',
  }),
];
