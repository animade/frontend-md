// -------------------------------------------------
//
// Gets config vars from ./package.json
// 
// -------------------------------------------------

var fs = require('fs'),
  c = require('./console_format'),
  _ = require('underscore'),
  nconf = require("nconf");

var config_path = './package.json';

function correct_object_syntax() {
  c.log('{');
  c.log('\t"frontend": {');
  c.log('\t\t"name": "Your Project Name",');
  c.log('\t\t"javascripts": "PATH_TO_YOUR_JAVASCRIPTS_FOLDER",');
  c.log('\t\t"stylesheets": "PATH_TO_YOUR_STYLESHEETS_FOLDER"');
  c.log('\t}');
  c.log('}');
}

var passed_setup = false;

var self = module.exports = {

  // ------------------------------------------------
  // Error

  init: function init(callback) {

    if (fs.existsSync(config_path)) {
      // Do something

      var n = nconf.argv()
        .env()
        .file({
          file: config_path
        });

      c.ok("Found package.json...");

      if (!_.isObject(n.get('frontend'))) {

        // ------------------------------------------------
        // Check for Frontend object
        //

        c.error("Frontend object not found in " + config_path);
        c.info("Fix by making sure a \"frontend\" object exists:");
        correct_object_syntax();

      } else if (!_.isString(n.get('frontend').stylesheets)) {

        // ------------------------------------------------
        // Check for SCSS string
        //

        c.error("Stylesheets key not found in frontend object");
        console.log("%j", n.get('frontend'));
        c.log("Fix by making sure the frontend object is correctly formatted:");
        correct_object_syntax();

      } else if (!_.isString(n.get('frontend').javascripts)) {

        // ------------------------------------------------
        // Check for JS string
        //

        c.error("Javascripts key not found in frontend object");
        console.log("%j", n.get('frontend'));
        c.log("Fix by making sure the frontend object is correctly formatted:");
        correct_object_syntax();

      } else if (!fs.existsSync(n.get('frontend').stylesheets)) {

        // ------------------------------------------------
        // Check for Stylesheets folder accesibility 
        //

        c.error("Couldn't find stylesheets folder \"" + n.get('frontend').stylesheets + "\"");
        c.log("Please check the folder path and try again.");

      } else if (!fs.existsSync(n.get('frontend').javascripts)) {

        // ------------------------------------------------
        // Check for Javascripts folder accesibility 
        //

        c.error("Couldn't find javascripts folder \"" + n.get('frontend').javascripts + "\"");
        c.log("Please check the folder path and try again.");

      } else {

        // ------------------------------------------------
        // All's well 
        //

        c.ok("Found javascripts & stylesheets folders...");

        // Run the callback 
        callback([{
          "type": "sass",
          "title": "Stylesheets",
          "path": n.get('frontend').stylesheets
        }, {
          "type": "scss",
          "title": "Stylesheets",
          "path": n.get('frontend').stylesheets
        }, {
          "type": "less",
          "title": "Stylesheets",
          "path": n.get('frontend').stylesheets
        }, {
          "type": "js",
          "title": "Javascripts",
          "path": n.get('frontend').javascripts
        }], n.get('frontend').name);

      }

    } else {

      c.error("Couldn't find " + config_path + ". Please create it in the root of your project and include a \"frontend\" object:");
      correct_object_syntax();

    }

  }

}
