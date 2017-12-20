/* I’ve removed mqpacker - it was causing order of rules issues */

const fixes = require('postcss-fixes');
const focus = require('postcss-focus');
const calc = require('postcss-calc');
const pseudoelements = require('postcss-pseudoelements');
const autoprefixer = require('autoprefixer');

module.exports = () => {
  return {
    plugins: [fixes(), focus(), calc(), pseudoelements(), autoprefixer()]
  };
};
