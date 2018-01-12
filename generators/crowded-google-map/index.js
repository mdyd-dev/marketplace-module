const Generator = require("yeoman-generator");
const chalk = require("chalk");
const path = require("path");

module.exports = class extends Generator {
  prompting() {
    const prompts = [];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath("."), this.destinationPath(path.join(process.cwd())), this.props);
  }

  install() {
    this.npmInstall(["crowded-google-map"], { save: true });
  }

  postInstall() {
    console.log(chalk.green("MPP :: Crowded Google Map"));
  }
};
