# grunt-angular-combine

> Combine AngularJS partials into a single HTML file.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-angular-combine --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-angular-combine');
```

## The "angularCombine" task

### Overview
In your project's Gruntfile, add a section named `angularCombine` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  angularCombine: {
    combine: {
      options : {
        appBaseDir : "app",
        targetDir : "target"
      },
      folders : [ 'directives' ]
    },
  },
})
```

### Options

#### options.appBaseDir
Type: `String`
Default value: `''`

A string value that is used to define the app directory.

#### options.targetDir
Type: `String`
Default value: `''`

A string value that is used to define where combined files should be created.

### Usage Examples

#### Options
In this example, all HTML files located into app/directives will be merged into a single file : target/directives.html. 

```js
grunt.initConfig({
  angularCombine: {
    combine: {
      options : {
        appBaseDir : "app",
        targetDir : "target"
      },
      folders : [ 'directives' ]
    },
  },
})
```

By defaults, it works in the current base directory.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

- 0.1.0 : initial version
- 0.1.1 : fix other-than-html file management
- 0.1.2 : fix only html files (filename ending with .html) should be processed
- 0.1.3 : manage nested folder
- 0.1.4 : change plugin name to stick with camel case convention

