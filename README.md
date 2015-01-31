# Frontend.md

## Generate simple documention for your Sass & Javascript in seconds. 

### Introduction

Frontend.md looks at your frontend source code and generates a markdown file (called, predictably, FRONTEND.md) outlining the folder/file structure together with any topline comments. It's not a complete documentation system or styleguide generator. Rather it's designed to be a very simple tool which you can use on new or existing projects to get a high level view of how the code is laid out. 

### Features

- Portable - drop it into any frontend project and see what's going on
- Easy setup - very little configuration required
- Attractive - generates a nested view of folder structure (inspiration taken from [sass-guidelin.es](http://sass-guidelin.es))
- Automated - Parses comments in a file, pulls out the first one and adds it as a description
- Readable - results are saved to a seperate Frontend.md markdown file in the root of your project

Below is a very simple example output for a stylesheets folder. The file descriptions (i.e. "# App Structure" etc) are pulled automatically from the first comment in each file (look in `test/source` for examples).

````
source/
|
|- stylesheets/
|  |- app.scss _____________________ # App Structure
|
|  |- modules/
|    |- _footer.scss _______________ # Footer
|    |- _header.scss _______________ # Header
|
|  |- base/
|    |- _base.scss _________________ # Base styles
|    |- _mixins.scss _______________ # Sass Mixins
|    |- _type.scss _________________ # Typography
|    |- _variables.scss ____________ # Variables
````

### Installation

Frontend.md is available via npm, so you'll need node installed. Once that's done, install with:  

```` 
npm install frontend-md -g
````

### Usage

In the root directory of your project name sure there is a `package.json` file with the following attributes:

```` 
{
  "frontend": {
    "name": "YOUR PROJECT NAME",
    "stylesheets": "RELATIVE/PATH/TO/STYLESHEETS/FOLDER",
    "javascripts": "RELATIVE/PATH/TO/JAVASCRIPTS/FOLDER"
  }
}
````

Change the values above then generate your `FRONTEND.md` file by running `frontend-md` from the root of your project:

````
frontend-md
````

All being well, you'll see something like this:

````
✔ Found package.json...
✔ Found javascripts & stylesheets folders...
✔ FRONTEND.md successfully created :-)
````

### Bugs

This is a very simple project and is held together by bits of string and sticky tape in some places, so if you find bugs please create an issue. Also any contributions or feature suggestions are very gratefully received!

### Limitations

- Currently only works compatible with `.scss` and `.js` files

### Roadmap

- Add Bower overview
- Add support for Coffeescript
- Add support for Javascript view templates
