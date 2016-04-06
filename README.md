# karma-safaritechpreview-launcher
A Karma plugin. Launcher for [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/).

## Installation
**Note, this plugin requires Node version 4.0 or higher.**
You can check your node version by typing `node --version`.

```bash
npm install karma-safaritechpreview-launcher --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['SafariTechPreview']
  });
};
```

Alternatively, as a CLI argument:
```bash
karma start --browsers SafariTechPreview
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com

### Attribution
This package is based on the original
[karma-safari-launcher](https://www.npmjs.com/package/karma-safari-launcher) by
[vojtajina](https://www.npmjs.com/~vojtajina).
