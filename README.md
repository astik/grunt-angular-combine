# grunt-angular-combine

[![Build Status: Linux](https://travis-ci.org/astik/grunt-angular-combine.svg?branch=master)](https://travis-ci.org/astik/grunt-angular-combine)

> Combine AngularJS partials into a single HTML file.

This plugin is helpful for better performance in AngularJS template loading.
You can use it to prepare templates for [angular-combine](https://github.com/astik/angular-combine). 
  

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
      files : [ {
        cwd : 'app/modules',
        src : [ 'module1/foo.html', 'module2/woot.html' ],
        dest : 'tmp/combined/modules.html'
      } ]
    }
  }
})

// or

grunt.initConfig({
  angularCombine: {
    combine: {
      files : [ {
        expand : true,
        cwd : 'app/modules',
        src : '*',
        dest : 'tmp/combined',
        filter : 'isDirectory'
      } ]
    },
  }
})
```

### Options

The default process doesn't need any option but which folder or wich files should be processed.

#### processIdentifier

Type: function
Default: function(id) { return id; }

```js
grunt.initConfig({
  angularCombine : {
    combine : {
      options : {
        processIdentifier : function(id) {
          // just use the files name without extension as identifier
          return id.split('/').pop().replace('.html', '');
        }
      },
      files : [ {
        expand : true,
        cwd : 'app/modules',
        src : '*',
        dest : 'tmp/combined',
        filter : 'isDirectory'
      } ]
    }
  }
})
```

With the *processIdentifier* options, you can define the fragment id strategy.
By default, with the following files structures :

```
* app/modules
  * module1/
    * module1-template1.html
    * module1-template2.html
    * module1-template3.html
```

you'll get those fragment id :

- module1/module1-template1.html
- module1/module1-template2.html
- module1/module1-template3.html

With the function defined into options (like the example above, you'll get :

- module1-template1
- module1-template2
- module1-template3

#### includeComments

Type: boolean
Default: true

```js
grunt.initConfig({
  angularCombine : {
    combineWithoutComment : {
      options : {
        includeComments : false
      },
      files : [ {
        expand : true,
        cwd : 'test/fixtures',
        src : 'combineWithoutComment',
        dest : 'tmp/combined',
        filter : 'isDirectory'
      } ]
    }
  }
})

This will remove the comment at the begining of the compiled files.
This should be a problem as template would certainly be minified anyway later in the delivery process.


### Usage Examples

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

By using the filter *isDirectory*, the plugin will process all HTML files found into each directory of you selection.
So that, you will get :

```
* tmp/combined
  * module1.html (containing the concatenation of module1-template1.html, module1-template2.html and module1-template3.html)
  * module2.html (containing the concatenation of module2-template1.html and module2-template2.html)
```

By defaults, it works in the current base directory.


## Contributing

You'll find all contributors on this [contributors page](https://github.com/astik/grunt-angular-combine/graphs/contributors)


## Release History

See the changelog =)

### Release process

The project use [grunt-release](https://github.com/geddski/grunt-release) for its versionning an tag process.
