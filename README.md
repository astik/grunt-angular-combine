# grunt-angular-combine

[![Build Status: Linux](https://travis-ci.org/astik/grunt-angular-combine.svg?branch=master)](https://travis-ci.org/astik/grunt-angular-combine)

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

No option.
Just define which folder should be processed.

### Usage Examples

#### Options

Imagine a file structure like this :

```
* app/modules
  * module1/
    * module1-template1.html
    * module1-template2.html
    * module1-template3.html
  * module2/
    * module2-template1.html
    * module2-template2.html
```

With this grunt config :

```js
grunt.initConfig({
  angularCombine : {
    combine : {
      files : [ {
        expand : true,
        cwd : 'app/modules',
        src : '*',
        dest : 'tmp/combined',
        filter : 'isDirectory'
      } ]
    }
  },
})
```

You will get :

```
* tmp/combined
  * module1.html (containing the concatenation of module1-template1.html, module1-template2.html and module1-template3.html)
  * module2.html (containing the concatenation of module2-template1.html and module2-template2.html)
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

