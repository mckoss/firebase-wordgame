Polymer('letter-tile', {
  x: 0,
  y: 0,

  onDrag: function(evt) {
    this.moveTo(this.x + evt.ddx, this.y + evt.ddy);
  },

  moveTo: function(x, y) {
    this.x = x;
    this.y = y;
    this.updatePosition();
  },

  xChanged: function() {
    this.updatePosition();
  },

  yChanged: function() {
    this.updatePosition();
  },

  updatePosition: function() {
    var tile = this.$.tile;
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    tile.style.left = this.x + 'px';
    tile.style.top = this.y + 'px';
    if (this.fired && this.x == this.fired.x && this.y == this.fired.y) {
      return;
    }
    this.fired = {x:this.x, y: this.y};
    console.log("fire moved: ", this.fired);
    this.fire('moved', this.fired);
  }
});
