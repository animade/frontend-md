# Frontend.md 

Frontend code structure for Frontend.md. 

Generated 30 January 2015 using [Frontend.md](http://github.com/animade/frontend-md)

---

### Stylesheets

````
test/
|
|- stylesheets/
|  |- app.scss _____________________ # App Structure
|  |- syntax.css.erb _______________ # -
|
|  |- toys/
|    |- .keep ______________________ # -
|
|  |- modules/
|    |- _articles.scss _____________ # doc
|    |- _buttons.scss ______________ # Buttons
|    |- _footer.scss _______________ # Footer
|    |- _header.scss _______________ # Header
|    |- _heading.scss ______________ # Heading
|    |- _menu.scss _________________ # Menu
|    |- _newsletter.scss ___________ # Newsletter prompt at the top of the page
|    |- _shapes.scss _______________ # http://codepen.io/Darsain/pen/IqjFe
|    |- _sharing.scss ______________ # Sharing
|    |- _sidebar.scss ______________ # Sidebar
|
|  |- custom/
|    |- crafty.scss ________________ # Custom CSS for Crafty demo
|    |- multipliers.scss ___________ # Custom CSS for multipliers demo
|
|  |- base/
|    |- .keep ______________________ # -
|    |- _animation.scss ____________ # Animation
|    |- _base.scss _________________ # Clearfix - http://nicolasgallagher.com/micro-clearfix-hack
|    |- _code.scss _________________ # Overrides for the code highlighting
|    |- _layout.scss _______________ # Layout
|    |- _links.scss ________________ # Links
|    |- _mixins.scss _______________ # MIXINS
|    |- _type.scss _________________ # Typography
|    |- _variables.scss ____________ # Type
|    |- _z.scss ____________________ # Zzzz
````

### Javascripts

````
|
|- javascripts/
|  |- app.js _______________________ # App
|
|  |- modules/
|    |- menu.js ____________________ # Menu
|    |- newsletter.js ______________ # Newsletter dropdown
|    |- sharing.js _________________ # 
|    |- transition.js ______________ # 
|
|  |- libs/
|    |- backbone-model-events.js ___ # 
|    |- modernizr-custom.js ________ # Modernizr 2.8.3 (Custom Build) | MIT & BSD
|
|  |- custom/
|
|    |- multipliers/
|      |- animation.js _____________ # Parenting Javascript animation demo
|      |- index.js _________________ # 
|      |- segment.js _______________ # Set up a segment
|
|    |- crafty/
|      |- assets.json ______________ # -
|      |- game.js __________________ # Assets model/collection
|      |- index.js _________________ # 
````