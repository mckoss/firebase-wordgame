Todo list

X Repo w Polymer/Bower/Closure Compiler/Closure Library
- qunit tests for non-UI components
- goog.module?
- browserify?
- jshint
- Domain hosting on Firebase
- Create new Game
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
    Tiles - string (opt-deterministic)
    currentPlayerId
    Moves [counter]
      playerId
      word
      pos [x, y]
      points
    Players by player-number (must be string key? 001, 002, …)
      username