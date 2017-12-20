// This file is not parsed by babel to avoid problems with webpack import calls.
// Would be nice to fix this problem one day.

/* eslint import/no-webpack-loader-syntax: off */
import './app.scss';

import 'expose-loader?assetsPromises!olvlvl-assets-promises'; // Expose at window.assetsPromises
import Rails from 'expose-loader?Rails!rails-ujs'; //  vanilla version

// Think about migrating: https://github.com/ressio/lazy-load-xt
// Has video support and some more goodies. But its a jquery plugin
import LazyLoad from 'vanilla-lazyload'; // Load images when they approach viewport

Rails.start();

$(function() {
  new LazyLoad({
    elements_selector: 'img, [data-lazy-load]',
    threshold: 250
  });
});

if (document.body.innerHTML.indexOf('Liquid Error') > -1) {
  console.error('--- Liquid Error Found ---');
}
