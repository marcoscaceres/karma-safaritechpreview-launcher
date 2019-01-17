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
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const SafariTechPreviewBrowser = function(baseBrowserDecorator) {
  baseBrowserDecorator(this);

  this._start = async function(url) {
    const HTML_TPL = path.normalize(__dirname + "/safari.html");
    const data = await readFileAsync(HTML_TPL);
    const staticHtmlPath = path.join(
      process.env.HOME,
      "Library/Containers/com.apple.SafariTechnologyPreview/Data/redirect.html"
    );
    const content = data.toString().replace("%URL%", url);
    await writeFileAsync(staticHtmlPath, content);
    this._execCommand(this._getCommand(), [staticHtmlPath]);
  };
};

SafariTechPreviewBrowser.prototype = {
  name: "SafariTechPreview",
  DEFAULT_CMD: {
    darwin:
      "/Applications/Safari Technology Preview.app/Contents/MacOS/Safari Technology Preview",
  },
  ENV_CMD: "SAFARI_TECHPREVIEW_BIN",
};

SafariTechPreviewBrowser.$inject = ["baseBrowserDecorator"];

module.exports = {
  "launcher:SafariTechPreview": ["type", SafariTechPreviewBrowser],
};
