Polymer('letter-tile', {
  moveTo: function(x, y) {
    console.log("Moving to", x, y);
    var tile = this.$.tile;
    tile.style.left = x + 'px';
    tile.style.top = y + 'px';
  }
});
