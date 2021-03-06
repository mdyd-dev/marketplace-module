const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'confirm',
        name: 'savePackage',
        message: 'Do you also want to save crowded-google-map module into your projects package.json?'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('.'),
      this.destinationPath(path.join(process.cwd(), 'marketplace_builder')),
      this.props
    );
  }

  install() {
    if (this.props.savePackage) {
      this.npmInstall(['crowded-google-map'], { save: true }).then(() => {
        console.log(chalk.green('MPP :: Crowded Google Map :: NPM module installed and saved to package.json'));
      });
    }
  }

  end() {
    console.log(
      chalk.green('See readme for the crowded-google-map package: https://www.npmjs.com/package/crowded-google-map')
    );
    console.log(
      chalk.yellow('Deploy your files and open your project at page /crowded-google-map to see the working example')
    );
  }
};
