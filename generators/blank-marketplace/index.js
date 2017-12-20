const Generator = require("yeoman-generator");
const chalk = require("chalk");
const path = require("path");
const mkdirp = require('mkdirp');



module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: "input",
        name: "name",
        message: "What is the name of your marketplace?"
      },
      {
        type: "input",
        name: "production",
        message: "Set PRODUCTION url:"
      },
      {
        type: "input",
        name: "staging",
        message: "Set STAGING url:"
      },
      {
        type: "input",
        name: "local",
        message: "Set LOCAL url:"
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const projectName = this.props.name.replace(/\s+/g, '-').toLowerCase();
    const projectDir = `marketplace-${projectName}`;

    console.log("Create marketplace files in ", projectDir)
    mkdirp.sync(projectDir);

    this.fs.copy(
      this.templatePath('files/**'),
      this.destinationPath(projectDir),
      {
        globOptions: { dot: true }
      }
    );


    this.fs.copyTpl(
      this.templatePath("files/marketplace_builder/.builder"),
      this.destinationPath(projectDir + "/marketplace_builder/.builder" ),
      {
        PRODUCTION_URL: this.props.production,
        STAGING_URL: this.props.staging,
        LOCAL_URL: this.props.local,
      }
    );

    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath(projectDir + '/README.md'),
      {
        NAME: this.props.name,
        DIR: projectDir
      }
    );

    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath(projectDir + '/package.json'),
      {
        NAME: this.props.name,
        PROJECT_NAME: projectName
      }
    );
  }

  install() {}

  postInstall() {
    console.log(chalk.green("MPP :: BlankMarketplace :: Module files generated"));
    console.log(chalk.green("You will find usefull information in README file"));
  }
};
