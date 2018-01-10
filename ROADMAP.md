## TODO

* [ ] Extract modules to a separate repo - this will allow update of modules without necessity to publish installer package
* [ ] Add README parsing that will be displayed/linked after installation of the module
* [ ] Allow installation of a module via git url (will be very helpful for big/active modules)

## Under consideration

* Allow installation with custom config (JSON file passed that will have precedence over module defaults)
* Add descriptions to modules and show them next to module name on the list
* Add searching through modules names/descriptions

## Done

* [x] Investigate if its possible currently to `copyTplDir()` with passing object that will be used in files. If its not possible to achieve using mem-fs, implement it

It turns out that it is possible and even [documented here](https://github.com/mdyd-dev/marketplace-module#populating-template-with-data) and [here](https://github.com/mdyd-dev/marketplace-module/blob/master/generators/boilerplate/index.js#L41).
