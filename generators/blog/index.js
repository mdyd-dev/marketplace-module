const Generator = require("yeoman-generator");
const chalk = require("chalk");
const path = require("path");
const targetPath = path.join(process.cwd(), "marketplace_builder");

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: "input",
        name: "blogScope",
        message: "Your blog url:",
        default: "new-blog"
      },
      {
        type: "confirm",
        name: "generateLayout",
        message: "Do you want to create layout template?",
        default: false
      },
      {
        type: "input",
        name: "layoutName",
        message: "Your blog layout name:",
        default: "new-blog"
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath("graph_queries/**"),
      this.destinationPath(`${targetPath}/graph_queries/`),
      {
        globOptions: { dot: true }
      }
    );
    this.fs.copy(
      this.templatePath("liquid_views/blog/**"),
      this.destinationPath(`${targetPath}/liquid_views/blog/`),
      {
        globOptions: { dot: true }
      }
    );

    console.log("this.props.generateLayout", this.props.generateLayout);
    if (this.props.generateLayout) {
      this.fs.copyTpl(
        this.templatePath("liquid_views/layouts/blog.layout.liquid"),
        this.destinationPath(
          `${targetPath}/liquid_views/layouts/${this.props.layoutName}.liquid`
        ),
        {
          BLOG_SCOPE: this.props.blogScope,
          LAYOUT_NAME: this.props.layoutName
        }
      );
    }

    this.fs.copyTpl(
      this.templatePath("pages/blog/index.liquid"),
      this.destinationPath(
        `${targetPath}/pages/${this.props.blogScope}/index.liquid`
      ),
      {
        BLOG_SCOPE: this.props.blogScope,
        LAYOUT_NAME: this.props.layoutName
      }
    );

    this.fs.copyTpl(
      this.templatePath("pages/blog/post.liquid"),
      this.destinationPath(
        `${targetPath}/pages/${this.props.blogScope}/post.liquid`
      ),
      {
        BLOG_SCOPE: this.props.blogScope,
        LAYOUT_NAME: this.props.layoutName
      }
    );
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
