const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'confirm',
        name: 'regionalmanager',
        message: "Some people say I'm the best boss in the world."
      },
      {
        type: 'checkbox',
        name: 'fire',
        message: 'Who do you hate in the office?',
        choices: ['Dwight', 'Jim', 'Pam', 'Toby'],
        default: ['Toby']
      },
      {
        type: 'list',
        name: 'employee',
        message: 'Identify yourself',
        choices: ['Dwight', 'Jim', 'Pam', 'Kevin', 'Toby'],
        default: 'Jim'
      },
      {
        type: 'input',
        name: 'favorite',
        message: 'The best candidate for position of assistant to the regional manager is...?',
        default: 'Dwight Schrute'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('.'),
      this.destinationPath(path.join(process.cwd())),
      this.props,
      {}, // do not forget to pass this empty object if you want to pass globOptions.
      {
        globOptions: { dot: true }
      }
    );
  }

  install() {
    // Example of installing dependencies saved in module package.json file (in this case not needed, ergo, commented)
    /*
      process.chdir(`${this.contextRoot}/${this.props.projectDir}`);
      this.npmInstall();
    */
  }

  end() {
    console.log(chalk.green('MPP :: Boilerplate :: Welcome to Dunder Mifflin'));
  }
};
