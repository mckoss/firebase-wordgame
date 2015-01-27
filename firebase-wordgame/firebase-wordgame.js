namespace.module('firebase-wordgame', function(exports, require) {
  var wrap = require('func-wrappers');
  var SAVE_INTERVAL = 100;
  var RACK_SIZE = 1;

  var rootRef = new Firebase("https://koss-wordgame.firebaseio.com");
  var gamesRef = rootRef.child('games');

  Polymer('firebase-wordgame', {
    created: function() {
      this._savePosition = wrap.rateLimit(SAVE_INTERVAL,
                                          wrap.dedup(this.savePos.bind(this)));
     },

    ready: function() {
      gamesRef.limitToLast(25).on('value', function(snapshot) {
        var games = snapshot.val() || {};
        var keys = Object.keys(games).sort().reverse();
        var list = keys.map(function(key) {
          games[key].key = key;
          return games[key];
        });
        this.games = list;
      }.bind(this));

      this._router = new Router({
        '/$': function () {
          this.page = 'home';
        }.bind(this),

        '/:page': function(page) {
          this.page = page;
        }.bind(this),

        '/game/:key': function(key) {
          this.navToGame(key);
        }.bind(this)
      });
      this._router.configure({
        on: function() {
          this.route = window.location.hash.slice(2);
        }
      });

      this._router.init();
    },

    fillRack: function() {
      for (var i = 0; i < RACK_SIZE; i++) {
        this.$.rack.addTile('A', 0, i);
      }
    },

    navToGame: function(key) {
      this.page = 'game';
      if (this.tileRef) {
        this.tileRef.off('value');
      }
      this.tileRef = gamesRef.child(key).child('tile');
      this.tileRef.on('value', function(snapshot) {
        var pos = snapshot.val();
        if (pos === null) {
          pos = {x: 0, y: 0};
        }
        this.$.tile.moveTo(pos.x, pos.y);
      }.bind(this));
    },

    routeChanged: function() {
      window.location.hash = this.route;
    },

    togglePanel: function() {
      this.$.drawerPanel.togglePanel();
    },

    savePosition: function(e) {
      this._savePosition(e.detail);
    },

    savePos: function(pos) {
      console.log("saving: ", pos);
      this.tileRef.set(pos);
    },

    onNavigate: function() {
      this.$.drawerPanel.closeDrawer();
    },

    createGame: function() {
      var newRef = gamesRef.push({
        created: new Date().toISOString()
      });
      this.navToGame(newRef.key());
    }

  });
});
