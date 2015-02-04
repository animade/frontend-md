#!/usr/bin/env node

var setup = require("./lib/setup"),
  filetree = require("./lib/filetree"),
  markdown = require("./lib/markdown");

// Gets command line arguments / settings
setup.init(function(config, name) {
  // Generate the filetree
  var ft = filetree.generate(config, function(filetree) {
    markdown.compile(filetree, name);
  });
});
