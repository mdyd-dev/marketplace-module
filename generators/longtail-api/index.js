const Generator = require("yeoman-generator");
const chalk = require("chalk");
const path = require("path");
const targetPath = path.join(process.cwd(), "marketplace_builder");

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: "input",
        name: "token",
        message: "Please provide your API token:",
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath("."), this.destinationPath(path.join(process.cwd())), this.props);
  }

  install() {
    console.log(chalk.green("MPP :: Longtail :: Installing"));
  }

  postInstall() {
    console.log(chalk.green("MPP :: LonggailAPI :: Module files generated"));

    var postMessage = `Please remember to include longtail/widget_links to the homepage and listing show page. \
    You can use the script below:

      <div id="longtail-widget-home">
        <div class="container">
          <h2>Your Header</h2>
          <ul id="longtail-links">
            {% include 'longtail/widget_links' %}
          </ul>
        </div>
      </div>
`
    console.log(chalk.red(postMessage));
  }
};
