const nodeExternals = require('webpack-node-externals');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');

const basePackage = {
  name: 'nmp',
  version: '0.0.1',
  bin: './index.js',
  main: './index.js',
  engines: {
    node: '>= 14',
  },
  pkg: {
    scripts: './index.js',
    targets: ['node16-linux-x64', 'node16-macos-x64', 'node16-win-x64'],
    outputPath: './',
  },
  scripts: {
    start: 'node ./index.js',
  },
  dependencies: {
    pg: '',
  },
};

const common = {
  mode: 'production',
  plugins: [new GeneratePackageJsonPlugin(basePackage)],
  resolve: {
    extensions: ['', '.js'],
  },
};

const backend = {
  entry: ['./dist/module03/index.js'],
  output: {
    filename: './index.js',
  },
  target: 'node',
  externals: [nodeExternals()],
};

module.exports = [Object.assign({}, common, backend)];
