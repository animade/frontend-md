// -------------------------------------------------
//
// Console output formatting
// 
// -------------------------------------------------

var color = require('cli-color');

var self = module.exports = {

  // ------------------------------------------------
  // Error

  error: function error(message) {
    console.log(color.red("☹ " + message));
  },

  // ------------------------------------------------
  // Warn

  warn: function warn(message) {
    console.log(color.yellow("⚑ " + message));
  },

  // ------------------------------------------------
  // Notice

  info: function info(message) {
    console.log(color.blue("! " + message));
  },

  // ------------------------------------------------
  // Success
  //

  ok: function ok(message) {
    console.log(color.green("✔ " + message));
  },

  // ------------------------------------------------
  // Success
  //

  log: function log(message) {
    console.log(message);
  }

}