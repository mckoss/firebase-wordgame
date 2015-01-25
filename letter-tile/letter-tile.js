namespace.module('letter-tile', function(require, exports) {
  var trackEvents = ['TrackStart', 'TrackEnd', 'Track'];

  Polymer('letter-tile', {
    x: 0,
    y: 0,
    tracking: false,

    ready: function() {
      trackEvents.forEach(function(evtName) {
        this.$.tile.addEventListener(evtName.toLowerCase(),
                                     this['on' + evtName].bind(this));
      }.bind(this));
      this.animate = this._animate.bind(this);
      this.render();
    },

    onTrackStart: function(evt) {
      this.tracking = true;
      this.animate();
    },

    onTrackEnd: function(evt) {
      this.tracking = false;
      this.fireMovedEvents();
    },

    onTrack: function(evt) {
      this.moveTo(this.x + evt.ddx, this.y + evt.ddy);
    },

    _animate: function() {
      if (!this.tracking) {
        return;
      }
      this.render();
      this.fireMovedEvents();
      requestAnimationFrame(this.animate);
    },

    moveTo: function(x, y, render) {
      this.x = x;
      this.y = y;
      if (render) {
        this.render();
      }
    },

    render: function() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.$.tile.style.left = this.x + 'px';
      this.$.tile.style.top = this.y + 'px';
    },

    fireMovedEvents: function() {
      if (this.updated &&
          this.x == this.updated.x &&
          this.y == this.updated.y) {
        return;
      }
      this.updated = {x:this.x, y: this.y};
      this.fire('moved', this.updated);
    }
  });

});
