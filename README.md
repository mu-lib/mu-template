# µ Template

- [source](main.js)
- [tests](tests)
- [changelog](CHANGELOG.md)

## Installation

```
npm install mu-template --save
```

```
bower install mu-template --save
```

## Usage

```javascript
// AMD
require(["mu-template/main.js"], function(template) {
  var $template = template("<title><%= data.title %></title>");
  
  console.log($template({
    title: "Some title"
  });
});
```
```javascript
// CJS
var $template  = require("mu-template/main")("<title><%= data.title %></title>");

console.log($template({
  title: "Some title"
});
```
```javascript
// Global
var $template  = window["mu-template/main"]("<title><%= data.title %></title>");

console.log($template({
  title: "Some title"
});
```
