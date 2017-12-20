const SCREENSHOT_PATH = './test/e2e/screenshots/';
const BINPATH = './node_modules/.bin/';

module.exports = {
  src_folders: ['test/e2e/suite'],
  output_folder: './test/e2e/reports',
  test_workers: true,
  selenium: {
    start_process: true,
    server_path: './node_modules/.bin/selenium.jar',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': './node_modules/.bin/chromedriver'
    }
  },
  test_settings: {
    default: {
      launch_url: 'http://expert-witness.oregon.lvh.me:3000',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: SCREENSHOT_PATH
      },
      globals: { waitForConditionTimeout: 5000 },
      desiredCapabilities: { browserName: 'chrome' }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  },
  custom_commands_path: [
    './node_modules/nightwatch-commands/commands'
  ],
  custom_assertions_path: [
    './node_modules/nightwatch-commands/assertions'
  ]
};

require('fs').stat(BINPATH + 'selenium.jar', (err, stat) => {
  // got it?
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, error => {
      if (error) throw new Error(error); // no point continuing so exit!
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});

module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
