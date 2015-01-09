/*

grunt-caveman

https://github.com/andrewchilds/grunt-caveman

# Example Usage

## Server-side compilation, client-side rendering

caveman: {
  compile: {
    src: ['path/to/templates/*.html'],
    dest: 'public/templates.js'
  }
}

## Server-side compilation & rendering

caveman: {
  compile: {
    src: ['path/to/templates/*.html'],
    render: {
      'indexPage': 'public/index.html',
      'aboutPage': 'public/about/index.html',
      'contactPage': 'public/contact/index.html'
    }
  }
}

*/

module.exports = function (grunt) {
  grunt.registerMultiTask('caveman', 'Compile caveman templates', function () {
    if (this.data.src && this.data.dest) {
      exports.compileTemplates(grunt, this.data.src, this.data.dest);
    }
    if (this.data.src && this.data.render) {
      exports.compileAndRenderTemplates(grunt, this.data.src, this.data.render);
    }
  });
};

exports.compileTemplates = function (grunt, src, templateFile) {
  var path = require('path');
  var Caveman = require('caveman');
  var templateCount = 0;

  var templates = '';
  grunt.file.expand(src).forEach(function (template) {
    templateCount++;
    var name = path.basename(template, path.extname(template));
    try {
      var compiled = Caveman.compile(grunt.file.read(template) + '');
      templates += "Caveman.register('" + name + "', function(Caveman, d) { " +
        compiled + " });\n";
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('Error compiling Caveman template ' + name +
        ' in ' + template);
    }
  });

  grunt.file.write(templateFile, templates);
  grunt.log.writeln(templateCount + ' templates saved to file ' +
    templateFile.cyan + '.');
};

exports.compileAndRenderTemplates = function (grunt, src, files) {
  var path = require('path');
  var Caveman = require('caveman');
  var _ = require('lodash');

  var templateCount = 0;

  grunt.file.expand(src).forEach(function (template) {
    var name = path.basename(template, path.extname(template));
    try {
      Caveman.register(name, grunt.file.read(template));
      templateCount++;
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('Error compiling Caveman template ' + name +
        ' in ' + template);
    }
  });

  _.each(files, function (dest, template) {
    grunt.file.write(dest, Caveman.render(template));
    grunt.log.writeln(template.cyan + ' -> ' + dest.cyan);
  });
};
