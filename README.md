# JSearch
Javascript Search Enviroment

## Config

```html
<script src="path-to-library/jsearch.js">
```

## Basic

**HTML**

```html
<input type="text" id="search">
<div id="result"></div>
```

**JS**

```js
var env = new JSearch.Env(
    document.getElementById('search'),
    document.getElementById('result')
);

env.add({
    name: "log",
    handler: function(q, mode){
        this.html(q);
    },
    mode: [2],
    pos: 1
});
```

[Demo](test/index.html)

## API

### JSearch.Env

```js
var env = new JSearch.Env(input, output);
```

+ `input`: input data (text input tag).
+ `output`: result will appear here (using block tag such as div, article,...).

### env.add(config)

Add search engine.

#### config

+ **config.name**: Name of engine.
+ **config.mode**: Mode using exec handler. Ex: `config.mode = [1, 2]`
    + `[1]`: When keydown
    + `[2]`: When enter
    + `[1, 2]`: Both key down and enter
+ **config.handler**: Handler search query. Ex: `config.handler = function(q, m){ this.html('HTML') }`
    + `q`: text in input tag.
    + `m`: mode to active engine.
    + `this`: bind result.
    + **this.html(html)**: write html data to result.
    + **this.attr(name, value)**: set attribute to tag which contain this engine
+ **config.pos**: Position of engin's result in env's result.

### env.run(mode)

Run all search engine.

**mode**

+ `1`: Run engine which contain mode [1] and [1, 2]
+ `2`: Run engine which contain mode [2] and [1, 2]

## License

MIT
