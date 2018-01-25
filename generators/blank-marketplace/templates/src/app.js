/* eslint import/no-webpack-loader-syntax: off */
import './app.scss';

import Rails from 'expose-loader?Rails!rails-ujs'; //  vanilla version

Rails.start();

if (document.body.innerHTML.indexOf('Liquid Error') > -1) {
  console.error('--- Liquid Error Found ---');
}
