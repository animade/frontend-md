// -------------------------------------------------
//
// Formats and renders comments to markdown
// 
// -------------------------------------------------

// Private
// var x = require('x');
var y = 'I am private';
var z = true;

function sum(num1, num2) {
  return num1 + num2;
}

// Public
var self = module.exports = {

  someProperty: 'I am public',

  testComments: function testComments() {
    console.log(markdown.addFive(1));
  },

  toggleZ: function toggleZ() {
    return z = !z;
  }

};