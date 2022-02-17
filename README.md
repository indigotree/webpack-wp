# Webpack Config for WordPress
A shared Webpack config for WordPress projects.

## Installation

Install via NPM:

```
npm i @indigotree/webpack-wp --save-dev
```

## Usage

Create a `webpack.config.js` file and include:

```
module.exports = require('@indigotree/webpack-wp');
```

## Assumptions

This config will assume the entry point of your project is `src/index.js` and will output the result in `dist/`.

However, you can use [webpack-merge](https://www.npmjs.com/package/webpack-merge) to customise these paths.

## License

GPL-3.0+
