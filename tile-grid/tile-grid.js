namespace.module('tile-grid', function(require, exports) {

  Polymer('tile-grid', {
    rows: 4,
    cols: 4,
    margin: 4,

    created: function() {
      this.tiles = [];
    },

    // The width of the grid must be set by the parent.  But we resize the
    // height to fit the requested number of rows.
    domReady: function() {
      this.totalWidth = this.offsetWidth;
      var horizGaps = this.margin * (this.cols + 1);
      var vertGaps = this.margin * (this.rows + 1);
      this.tileSize = (this.totalWidth -  horizGaps) / this.cols;
      this.$.grid.style.height = (vertGaps + this.tileSize * this.rows) + 'px';
    },

    addTile: function(ch, row, col) {
      // TODO(koss): Call element constructor instead?
      var tile = document.createElement('letter-tile');
      tile.letter = ch;
      tile.size = this.tileSize;

      this.tiles[this.tileIndex(row, col)] = {
        row: row,
        col: col,
        ch: ch
      };
      this.$.grid.appendChild(tile);
      this.moveTile(tile, row, col);
    },

    tileIndex: function(row, col) {
      return row * this.rows + col;
    },

    arrangeTiles: function() {
      // Distribute tiles in light dom at upper left of grid???
      //var tiles = this.$.tiles.getDistributedNodes();
      var tiles = this.children;
      var i = 0;
      for (var row = 0; row < this.rows; row++) {
        for (var col = 0; col < this.cols; col++) {
          tiles[i].size = this.tileSize;
          this.moveTile(tiles[i], row, col);
          i += 1;
          if (i == tiles.length) {
            break;
          }
        }
      }
    },

    moveTile: function(tile, row, col) {
      var x = this.margin + (this.margin + this.tileSize) * col;
      var y = this.margin + (this.margin + this.tileSize) * row;
      tile.moveTo(x, y);
    }

  });

});
