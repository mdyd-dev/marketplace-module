const Generator = require("yeoman-generator");
const chalk = require("chalk");
const path = require("path");
const targetPath = path.join(process.cwd(), "marketplace_builder");

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: "input",
        name: "blog_scope",
        message: "Your blog url:",
        default: "new-blog"
      },
      {
        type: "list",
        name: "blog_type",
        message: "Your blog type is:",
        choices: [ "User Blog", "Instance Blog" ]
      },
      {
        type: "input",
        name: "layout_name",
        message: "Your blog layout name:",
        default: "new-blog"
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath(".") + '/common', this.destinationPath(path.join(process.cwd())), this.props);
    this.fs.move(targetPath + '/liquid_views/layouts/blog.liquid',
      targetPath + '/liquid_views/layouts/' + this.props.layout_name + '.liquid')
    this.fs.move(targetPath + '/pages/blog/**',
      targetPath + '/pages/' + this.props.blog_scope)

    if (this.props.blog_type == 'User Blog') {
      this.fs.copyTpl(this.templatePath(".") + '/user_blog', this.destinationPath(path.join(process.cwd())), this.props);
    } else {
      this.fs.copyTpl(this.templatePath(".") + '/instance_blog', this.destinationPath(path.join(process.cwd())), this.props);
    }
  }

  install() {
    console.log(chalk.green("MPP :: Blog :: Installing"));
    // console.log(chalk.green("MPP :: Blog :: Installing NPM dependencies"));

    // process.chdir(`${process.cwd()}/${this.projectDir}`);
    // this.npmInstall();
  }

  postInstall() {
    console.log(chalk.green("MPP :: BlogModule :: Module files generated"));
  }
};
