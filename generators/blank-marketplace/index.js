const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');

const isEmpty = input => (input.length === 0 ? console.log(chalk.red('\nCant be empty')) : true);

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your marketplace?',
        validate: isEmpty
      },
      {
        type: 'input',
        name: 'production',
        message: 'Set PRODUCTION url:',
        validate: isEmpty
      },
      {
        type: 'input',
        name: 'staging',
        message: 'Set STAGING url:',
        validate: isEmpty
      },
      {
        type: 'input',
        name: 'local',
        message: 'Set LOCAL url:',
        validate: isEmpty
      }
    ];

    return this.prompt(prompts).then(props => {
      const projectName = props.name.replace(/\s+/g, '-').toLowerCase();

      this.props = Object.assign({}, props, {
        projectName: projectName,
        projectDir: `marketplace-${projectName}`
      });
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(this.props.projectDir),
      this.props,
      {},
      {
        globOptions: { dot: true }
      }
    );
  }

  install() {
    console.log(chalk.green('MPP :: BlankMarketplace :: Installing NPM dependencies'));

    process.chdir(`${this.contextRoot}/${this.props.projectDir}`);
    this.npmInstall();
  }

  end() {
    console.log(chalk.green('MPP :: BlankMarketplace :: Module files generated'));
    console.log(chalk.green('You will find usefull information in README file'));
  }
};
