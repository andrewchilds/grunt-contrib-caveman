# grunt-caveman

Compile Caveman templates on the server-side using Grunt. Optionally render templates on the server-side as well.

## Installation

```sh
npm install grunt-caveman
```

## Usage

Add the grunt-caveman task to your Grunt config:

```js
grunt.loadNpmTasks('grunt-caveman');
```

### Server-side compiling, client-side rendering

```js
caveman: {
  compile: {
    src: ['path/to/templates/*.html'],
    dest: 'public/templates.js'
  }
}
```

### Using pre-compiled templates on the client

```js
var myTemplateData = { foo: [1, 2, 3], bar: true };
var html = Caveman.render('myTemplateName', myTemplateData);
document.getElementById('foo').innerHTML = html;
```

### Server-side compiling and rendering

```js
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
```

## License

MIT. Copyright &copy; 2015 Andrew Childs
