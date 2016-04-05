/**
 * The MIT License
 *
 * Copyright (C) 2016 Marcos Cáceres.
 * Copyright (C) 2011-2013 Vojta Jína and contributors.
 *
 * See LICENSE file.
 */
/*jshint node: true*/
"use strict";
const async = require('marcosc-async');
const fs = require('fs-promise');
const path = require('path');

const SafariTechPreviewBrowser = function (baseBrowserDecorator) {
  baseBrowserDecorator(this);

  this._start = async(function * (url) {
    const HTML_TPL = path.normalize(__dirname + '/safari.html');
    const self = this;
    let data;
    try {
      data = yield fs.readFile(HTML_TPL);
    } catch (err) {
      throw err;
    }
    const content = data.toString().replace('%URL%', url);
    const staticHtmlPath = self._tempDir + '/redirect.html';
    try {
      yield fs.writeFile(staticHtmlPath, content);
    } catch (err) {
      throw err;
    }
    self._execCommand(self._getCommand(), [staticHtmlPath]);
  }, this);
};

SafariTechPreviewBrowser.prototype = {
  name: 'SafariTechPreview',
  DEFAULT_CMD: {
    darwin: '/Applications/Safari\ Technology\ Preview.app/Contents/MacOS/Safari\ Technology\ Preview',
  },
  ENV_CMD: 'SAFARI_TECHPREVIEW_BIN',
};

SafariTechPreviewBrowser.$inject = ['baseBrowserDecorator'];

module.exports = {
  'launcher:SafariTechPreview': ['type', SafariTechPreviewBrowser]
};