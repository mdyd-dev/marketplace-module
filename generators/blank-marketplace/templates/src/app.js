import './app.scss';

import Rails from 'expose-loader?Rails!rails-ujs'; //  vanilla version
import LazyLoad from 'vanilla-lazyload'; // Load images when they approach viewport

Rails.start();

new LazyLoad({
  elements_selector: 'img, [data-lazy-load]',
  threshold: 250
});

if (document.body.innerHTML.indexOf('Liquid Error') > -1) {
  console.error('--- Liquid Error Found ---');
}

// Show async chunk loading. They will load randomly, look in devtools console for proof.
[1, 2, 3, 4, 5].map(i => {
  const rand = parseInt(Math.random() * 100);
  const load = rand > 33;
  if (load) {
    import(/* webpackChunkName: "test" */ `./modules/test${i}.js`).then(module => {
      module.default(rand);
    });
  }
});
