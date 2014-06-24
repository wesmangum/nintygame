
'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
     this.game.scale.pageAlignHorizontally = true;
     this.game.scale.pageAlignVertically = true;
     this.game.scale.refresh();
    this.load.image('preloader', '../../../img/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;
