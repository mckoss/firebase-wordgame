Polymer('letter-tile', {
  x: 0,
  y: 0,

  moveTo: function(x, y) {
    this.x = x;
    this.y = y;
    this.updatePosition();
  },

  updatePosition: function() {
    var tile = this.$.tile;
    tile.style.left = this.x + 'px';
    tile.style.top = this.y + 'px';
  },

  xChanged: function() {
    this.updatePosition();
  },

  yChanged: function() {
    this.updatePosition();
  },

  onDrag: function(evt) {
    this.moveTo(this.x + evt.ddx, this.y + evt.ddy);
  },
});
