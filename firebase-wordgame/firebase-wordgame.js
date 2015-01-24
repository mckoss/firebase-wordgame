Polymer('firebase-wordgame', {
  ready: function() {
    console.log("firebase-wordgame loaded");
    var ref = new Firebase("https://koss-wordgame.firebaseio.com/games");
    ref.set({});
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

  newGameClicked: function() {
    console.log("NYI");
  }
});
