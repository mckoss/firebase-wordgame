namespace.module('firebase-wordgame', function(exports, require) {
  var wrap = require('func-wrappers');
  var saveInterval = 100;

  Polymer('firebase-wordgame', {
    created: function() {
      this._savePosition = wrap.rateLimit(saveInterval,
                                          wrap.dedup(this.savePos.bind(this)));
     },

    ready: function() {
      console.log("firebase-wordgame loaded");
      this.realtimeRef = new Firebase("https://koss-wordgame.firebaseio.com/realtime");
      this.realtimeRef.on('value', function(snapshot) {
        var pos = snapshot.val();
        this.$.tile.moveTo(pos.x, pos.y, true);
      }.bind(this));

      var ref = new Firebase("https://koss-wordgame.firebaseio.com/games");
      // ref.set({});
      ref.push({
        created: new Date().toISOString()
      });

      ref.on('value', function(snapshot) {
        var games = snapshot.val();
        var keys = Object.keys(games).sort();
        var list = keys.map(function(key) {
          return games[key];
        });
        this.games = list;
      }.bind(this));
    },

    togglePanel: function() {
      this.$.drawerPanel.togglePanel();
    },

    savePosition: function(e) {
      this._savePosition(e.detail);
    },

    savePos: function(pos) {
      console.log("saving: ", pos);
      this.realtimeRef.set(pos);
    }

  });
});
