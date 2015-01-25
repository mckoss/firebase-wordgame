Polymer('letter-tile', {
  moveTo: function(x, y) {
    console.log("Moving to", x, y);
    this.shadowRoot.host.style.left = x + 'px';
    this.shadowRoot.host.style.top = y + 'px';
  }
});
