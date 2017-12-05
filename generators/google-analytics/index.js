const Generator = require("yeoman-generator");
const chalk = require("chalk");
const path = require("path");

const targetPath = path.join(process.cwd(), "marketplace_builder");

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: "input",
        name: "production",
        message: "Set PRODUCTION environment API KEY:"
      },
      {
        type: "input",
        name: "staging",
        message: "Set STAGING environment API KEY:"
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("ga.liquid"),
      this.destinationPath(`${targetPath}/liquid_views/google-analytics/ga.liquid`),
      {
        PRODUCTION_API_KEY: this.props.production,
        STAGING_API_KEY: this.props.staging
      }
    );
  }

  install() {}

  postInstall() {
    console.log(chalk.green("MPP :: GoogleAnalytics :: Module files generated"));
    console.log(
      chalk.yellow(`Copy following code to your page (or layout) to use the module:
    {% include "google-analytics/ga" %}`)
    );
  }
};
