## Installation

`npm install -g @marketplace-platform/marketplace-module`

## Usage

### List available modules

`marketplace-module list`

### Install module

`marketplace-module install <name>`

---

## How to write a module

Module is just [yeoman](https://github.com/yeoman/yo) generator. It was heavily inspired by rails scaffolding, so think
of it that way. So basically what you are learning is how to write yeoman generators, which is a good thing, because
there are a lot of resources in the web to learn that already.

Every generator has to be places inside `generators` directory under its own unique name. Look inside to see the
examples.

And remember - this is just javascript.

### Yeoman generator life cycles

* Prompting - this is where you should ask user to input all the necessary data that you will use in later stages of the
  process
* Writing - this is where you generate or just simply copy files over to a different location
* Install - in some cases modules might need some operations done after writing phase - this is place to do it (for
  example, if your module uses some external file that needs to be present and you want it to be as up to date as
  possible, you can download it here)
* Post-install - use this phase to inform user of any post-installation operations that he/she may need to perform to
  finish installation. For example if your module needs to be included in liquid view - tell user about it. Dont
  hesitate to use `chalk` to emphasise important bits of information.

### User input

User input is handled by a amazing library called [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) - it's great
and its well documented and battle tested... See [short API docs](https://github.com/SBoudrias/Inquirer.js/#question)
for more info.

```javascript
prompting() {
  const prompts = [
    {
      type: "confirm",
      name: "regionalmanager",
      message: "Some people say I'm the best boss in the world."
    },
    {
      type: "checkbox",
      name: "fire",
      message: "Who do you hate in the office?",
      choices: ["Dwight", "Jim", "Pam", "Toby"],
      default: ["Toby"]
    },
    {
      type: "list",
      name: "employee",
      message: "Identify yourself",
      choices: ["Dwight", "Jim", "Pam", "Kevin", "Toby"],
      default: "Jim"
    },
    {
      type: "input",
      name: "favorite",
      message: "The best candidate for position of assistant to the regional manager is...?",
      default: "Dwight Schrute"
    }
  ];

  return this.prompt(prompts).then(props => {
    this.props = props;
  });
}
```

### Copying files

You can very easily copy whole directory structure from one place to another.

```javascript
writing() {
  this.fs.copy(
    // this path is relative from templates/ directory inside a generator
    // so putting a `.` means copy everything inside (keeping the directory structure)
    this.templatePath("."),

    // destination path is an absolute path where you want to put your files.
    // if you need to get a path of location where you have run the command, use `process.cwd()`
    this.destinationPath(path.join(process.cwd()))
  );
}
```

### Populating template with data

If you want to make file more dynamic you use `this.fs.copyTpl` method and pass an object to the file. You can
parametrize any file. Syntax that is used inside is called [EJS](http://www.embeddedjs.com/) - Embedded JavaScript -
think: ERB for JS.

Last argument is the object with data that will be available inside the template files. You can access them by simply
using `<%= variableName %>` syntax.

```javascript
writing() {
  this.fs.copyTpl(
    this.templatePath("boss.liquid"),
    this.destinationPath("boss.liquid"),
    {
      firstName: "Michael",
      lastName: "Scott",
      position: "Regional Manager",
      email: "michaelscott@dundermifflin.com"
    }
  );
}
```

Just like in copy method you can copy contents of the template directory, passing props from writing phase.

```javascript
this.fs.copyTpl(this.templatePath("**/*"), this.destinationRoot(), this.props);
```

### Resources

* http://yeoman.io/authoring/index.html - yeoman official guide to authoring generators
* http://yeoman.io/generators/ - DB of generators - good inspiration source
* https://github.com/SBoudrias/Inquirer.js/#documentation - Inquirer docs
