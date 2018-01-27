# blank-marketplace

This module is supposed to give you a quick(er) start into marketpace development by giving you some things already setup.

## webpack build process

1) dynamic code splitting - lazy load when needed
2) using CDN path provided by server - no hardcoding weird paths, just works everywhere
3) extracting common code from lazy-loaded modules
4) and entry points (ie. `node_moduldes/`)
5) loaders support for: sass, fonts, images, es6
6) doesn't parse files that match `/node_modules\/.*.min.js/` regexp to avoid double minification, which usually result in slower compilation time and bigger file

For implementation details look into `webpack.config.js`.

## Long term caching

Long term caching is realized in two ways:
1) using `asset_url` filter for entry points (ie. app.js, vendor.js) by adding query param with timestamp from last update on s3 bucket
2) by adding hashes to filenames that are not loaded using asset_url filter - code lazy loaded by webpack
3) manifest file is extracted to its own file (manifest.js) - changing chunks should not invalidate it
4) `HashedModuleIdsPlugin` is used to prevent changing modules ID between compilations for production (similarly NamedModulesPlugin for development)

## Images lazy loading

To improve performance (especially on homepage, with a lot of images, mostly below the fold) there is [`vanilla-lazyload`](https://github.com/verlok/lazyload) included out of the box.

It is included, configured and initialized in `app.js` - feel free to customize it to your needs.

## npm scripts

Those should help you quickly develop, lint, build, deploy your code.

Use `npm run` command to see what tasks you have at your disposal and what they do.

## ES6

Use ES6 features. You have babel on board.

## Code linting

There is a git-precommit hook setup that will run your source code through [`prettier-eslint`](https://github.com/prettier/prettier-eslint). Read about eslint and `prettier` for more info. See config in `.eslintrc.json`.

## Views

There are couple views (layout, layout includes, homepage) in this module to show you how you can structure your initial code, but most of the features you probably will want to install using other modules inside marketplace-module tool.

## Feature requests

Feel free to reach out using issues in this repository to request something included if you find yourself using something in every project (keep in mind that complete features should be modularized into their own modules to allow composition)

## Roadmap

### Pure frontend
Make this starting point a PWA by default. This means some/all of below improvements:

- [ ] Eliminate FOIT (Flash Of Invisible Text) for WebFonts
- [ ] Implement inlining small images/fonts into css to save http requests
- [ ] Add workbox-webpack-plugin for service worker
- [ ] Site use cache first networking
- [ ] Create Web App Manifest (using webpack-pwa-manifest maybe?)
- [ ] Score at least a 90 on lighthouse
- [ ] Upgrade to use latest webpack (currently webpack 4 beta is in development with huge performance and features improvements)

### Marketplace

Because yeoman generators can be composited there are couple modules that will be needed in most of the marketplaces, so including some of those modules makes sense - ie. registration, search, contact form, user profile edit, basic layout based theme, fonticons build process.
