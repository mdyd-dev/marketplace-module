const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const targetPath = path.join(process.cwd(), 'marketplace_builder');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'blog_scope',
        message: 'Your blog url:',
        default: 'new-blog'
      },
      {
        type: 'confirm',
        name: 'generate_layout',
        message: 'Do you want to create layout template?',
        default: false
      },
      {
        type: 'input',
        name: 'layout_name',
        message: 'Your blog layout name:',
        default: 'new-blog'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath('.'), this.destinationPath(path.join(process.cwd())), this.props);
    this.fs.move(`${targetPath}/liquid_views/layouts/blog.liquid`,
      `${targetPath}/liquid_views/layouts/${this.props.layout_name}.liquid`)
  }

  install() {
    console.log(chalk.green('MPP :: Blog :: Installing'));
    // console.log(chalk.green("MPP :: Blog :: Installing NPM dependencies"));

    // process.chdir(`${process.cwd()}/${this.projectDir}`);
    // this.npmInstall();
  }

  end() {
    console.log(chalk.green('MPP :: BlogModule :: Module files generated'));
  }
};
