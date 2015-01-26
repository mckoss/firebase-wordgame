Todo list

X Repo w Polymer/Bower/Closure Compiler/Closure Library
X qunit tests for non-UI components
X jshint
X Add to Homescreen page (manifest)
X Revert menu to slide-out panel
X <drag-tile>
X Realtime sharing of tile positions via Firebase
X Polymer routing? #anchor URLS
- Auth (G+ or Facebook)
- Run tests from command line (non-browser)
X Host on firebase - koss-wordgame.firebaseapp.com
X Custom domain
X Create new Game
- Generates “Join Code” - anyone can join.
- Turns are based on join order in game.
- Deterministic random numbers pick from english frequency letters to refill rack.
- UI Panels
  - Title/Heading
  - Menu (pop-out)
  - Game board
  - Rack
  - Player roster w/ scores
- Schema
  Games (game-id is random seed)
    create-date
    tiles - string (opt-deterministic)
    currentPlayerId
    Moves [counter]
      playerId
      word
      pos [x, y]
      points
    Players by player-number (must be string key? 001, 002, …)
      username
- WCT tests

Cleanup
--------
- Use layout center-center instead of tiles line height? - https://www.polymer-project.org/articles/spa.html
- goog.module?
- browserify?

Bugs
-----
- Navigation to / should redirect to home!
- Moving a tile in an uncreated game - just creates a game (invalid) object.
- core-animated-pages not animating???
- Mixed content - Roboto not using https
  <link href="http://fonts.googleapis.com/css?family=Roboto:400,300,500,700|Source+Code+Pro"
  Should be "//fonts..."
- web-animations-next-lite.min.js.map - 404
- Could not add user-select:none to App title! - did not apply to shadow-dom element.
      .noselect {
      -webkit-user-select: none;
      user-select: none;
      }
