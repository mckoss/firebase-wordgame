Polymer('firebase-wordgame', {
  ready: function() {
    console.log("firebase-wordgame loaded");
    this.messages = [
      {messageType: "ping"},
      {messageType: "pong"}
    ];
  }
});
