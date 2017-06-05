'use strict'
const path = require('path')
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const mkdirp = require('mkdirp')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.argument('appname', {type: String, required: false})
  }

  prompting() {
    this.log(yosay(
      'Welcome to the primo ' + chalk.red('generator-gradle-java') + ' generator!'
    ))

    const prompts = [{
      type: 'input',
      name: 'groupId',
      message: 'Your project group id',
      default: ''
    }, {
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.options.appname || path.basename(process.cwd())
    }, {
      type: 'input',
      name: 'description',
      message: 'Your project description',
      default: this.options.appname || path.basename(process.cwd())
    }, {
      type: 'input',
      name: 'javaVersion',
      message: 'Java version to use',
      default: '1.8'
    }, {
      type: 'input',
      name: 'junitVersion',
      message: 'JUnit version to use',
      default: '4.12'
    }]

    return this.prompt(prompts).then(props => {
      this.props = props
    })
  }
  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your project must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      )
      mkdirp(this.props.name)
      this.destinationRoot(this.destinationPath(this.props.name))
    }
  }

  writing() {
    this.config.save()
      const pkg = this.props.groupId.replace(/[.]/g, '/')
      const javaMainSrc = `src/main/java/${pkg}`
      const javaTestSrc = `src/test/java/${pkg}`

    this.fs.copyTpl(this.templatePath('build.gradle'), this.destinationPath('build.gradle'), this.props)
    this.fs.copyTpl(this.templatePath('settings.gradle'), this.destinationPath('settings.gradle'), this.props)
    this.fs.copyTpl(this.templatePath('Hello.java'), this.destinationPath(`${javaMainSrc}/hello/Hello.java`), this.props)
    this.fs.copyTpl(this.templatePath('HelloTest.java'), this.destinationPath(`${javaTestSrc}/hello/HelloTest.java`), this.props)
  }
}
