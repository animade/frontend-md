// -------------------------------------------------
//
// Generates the file tree
// 
// -------------------------------------------------

var _ = require("underscore"),
  fs = require('fs'),
  walk = require('walk');

var comment_starters = ["/", "*"];
var folder_history = [];
var indentation_target = 30;
var markdown_contents = "";
var asset_type_counter = 0;

// -------------------------------------------------
// Render the code folder structure sections
//

function render_code_folder_structure(folder, title, callback) {

  var folder_depth = 0; // Pointer to indicate how deep we've gone through the folders
  var folder_history = [];

  // ------------------------------------------------
  // Iterate through the folders
  //

  var files = [];

  // Walker options
  var walker = walk.walk(folder, {
    followLinks: false
  });

  // ------------------------------------------------
  // Open the code block
  //

  markdown_contents += "\n\n";
  markdown_contents += "### " + title;
  markdown_contents += "\n\n";
  markdown_contents += '````';
  markdown_contents += "\n";


  walker.on('file', function(root, stat, next) {

    var full_path = root + '/' + stat.name;

    fs.readFile(full_path, 'utf8', function(err, data) {

      if (err) {
        return console.log(err);
      } else {

        // Add this file to the list of files
        files.push({
          name: full_path,
          data: data
        });

        next();

      }
    });

  });

  walker.on('end', function() {

    // Reverse the folder order
    files.reverse();

    for (var i = files.length - 1; i >= 0; i--) {
      markdown_contents += indent_file_name(files[i]);
    };

    // ------------------------------------------------
    // Close the code block
    //

    markdown_contents += '````';

    callback();

  });
}

// -------------------------------------------------
//
// Parses comments 
// 
// -------------------------------------------------

function parse_comments(file, ext, spaces_added) {

  var output = "",
    first_comment_contents = "";

  if ((ext == 'scss') || (ext == 'js')) {

    var lines = file.data.split("\n");

    if (lines.length > 0) {

      for (var i = 0; i < lines.length; i++) {

        // We know this line starts with a comment character
        if (comment_starters.indexOf(lines[i][0]) > -1) {

          // ------------------------------------------------
          // Format the output string by replacing comment characters & trimming
          // 

          var formatted_comment = lines[i]
            .replace(/\/\*/, "") // Replace comments - /*
            .replace(/\*/, "") // Replace comments - *
            .replace(/(^\/+|\/+$)/g, '') // Replace comments - // & /
            .replace(/(^\s+|\s+$)/g, ''); // Replace initial spaces

          // ------------------------------------------------
          // Is there something in the comment?
          //
          var letters = /^[0-9a-zA-Z]+$/;

          var first_char = formatted_comment[0];

          // console.log(first_char);
          if (!_.isUndefined(first_char)) {

            if (first_char.match(letters)) {

              // Append the output 
              //  + " / " + lines.length + " lines"
              output += indent_file_comment(file, spaces_added) + formatted_comment;

              break;

            }

          }

        } else {

          output += indent_file_comment(file, spaces_added);

          break;

        }

        // ------------------------------------------------
        // Parsed all the comments, didn't find any strings to render
        //

        if (i == (lines.length - 1)) {
          output += indent_file_comment(file, spaces_added);
        }

      };

    } else {

      output += indent_file_comment(file, spaces_added) + "(blank file)\n";

    }


  } else {

    // Format not supported
    output = indent_file_comment(file, spaces_added) + "-";

  }

  return output;

}

// ------------------------------------------------
// Indents the files comment in the tree
//

function indent_file_comment(file, spaces_added) {
  // How long should the tab string be?
  var file_name_length = _.last(file.name.split('/')).length;

  // The comment spaces is the file name target indentation, minus the length of
  // the file name, minus the existing left hand side indentation 

  var comment_spaces = (indentation_target - file_name_length) - spaces_added;

  var comment_prefix = " ";

  for (var a = 0; a <= comment_spaces; a++) {
    comment_prefix += (a % 2 === 0) ? "_" : "_";
  };

  comment_prefix += " # ";

  return comment_prefix;

}



// -------------------------------------------------
// Indents a file to a given depth
// 

function indent_file_name(file) {

  var segments = file.name.split('/'),
    output = "";

  for (var i = 0; i <= segments.length - 1; i++) {
    output += print_segment_at_depth(i, segments, file);
  };

  return output;

}


// ------------------------------------------------
// Prints segments to code at a given depth
//

function print_segment_at_depth(s, segments, file) {

  var output = "",
    indent_with = "  ",
    suffix = "",
    start_indenting_at = 2,
    spaces_added = 0,
    ext = _.last(file.name.split('.')),
    is_folder = false;

  // Is this a folder or a file? 	
  is_folder = (segments[s].indexOf('.') > -1) ? false : true;

  if (folder_history[s] !== segments[s]) {

    // Set a / suffix on folders
    suffix = (is_folder) ? "/" : "";

    // Set the folder at this depth to be the current segment
    folder_history[s] = segments[s];

    // Is this the base folder?
    if (s == 0) {

      output += segments[s] + suffix + "\n";

    } else {

      // If this is a folder, add newline before it
      if (is_folder) {
        output += "|" + "\n";
      }

      // If we are indenting, add a pipe on the left edge
      if (s >= start_indenting_at) {
        output += "|";
      }

      // Add the indentation appropriate to the level
      for (var i = start_indenting_at; i <= s; i++) {
        output += indent_with;
        spaces_added += 2;
      };

      //  Append comments?
      if (is_folder == false) {
        // Pass in existing indentation 
        suffix += parse_comments(file, ext, spaces_added);
      }

      // Finally append the file/folder name to the output
      output += "|- " + segments[s] + suffix + "\n";

    }

  }

  return output;

}

// ------------------------------------------------
// Cycle through the object and run the relevant functions
//

function iterate_asset_folders(arr, callback) {

  render_code_folder_structure(arr[asset_type_counter].path, arr[asset_type_counter].title, function() {

    asset_type_counter++;

    if (asset_type_counter < arr.length) {
      iterate_asset_folders(arr, callback);
    }

    // Is this is the last folder, run the callback
    if (asset_type_counter === arr.length) {
      callback(markdown_contents);
    }

  });

}

// ------------------------------------------------
// Return the module
//

var self = module.exports = {

  generate: function generate(arr, callback) {

    if (_.isArray(arr)) {

      iterate_asset_folders(arr, callback);

    } else {

      console.error("Expected an object, exiting.");

    }

  }


};