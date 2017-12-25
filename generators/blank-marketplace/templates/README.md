# <%= NAME %>

## Getting started

1. Install npm dependencies using `npm i`
2. In your `<%= DIR %>` directory:

* `npm i` # install npm dependencies
* `marketplace-kit sync -e <env>` # update assets/views/graphql/translations in database if they change
* `npm start` # start watching source files by webpack

Assets will be built into: `marketplace_builder/custom_themes/default_custom_theme_assets/` (in this document later
called `${BUILD_DIR}` - it is set up inside `package.json` file)

### Deploy

To deploy to staging/prod use:

    npm run deploy:<env>

Example:

    npm run deploy:staging

This will build assets and deploy changes to given environment.

Remember to have proper configuration in `marketplace_builder/.builder` file.

### Building production assets

Before pushing/deploying your changes it is a good practice to generate production assets.

    npm run build:prod

#### Suspicious Node errors

Make sure you have correct versions `node` and `npm` installed in your system and in use. Check required versions in
`package.json` file.

Almost all errors can be solved by reinstalling npm dependencies and rebuilding C extensions:

    npm rebuild
