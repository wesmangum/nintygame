var Phaser = require('phaser');

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    'use strict';

    var style = { font: '20px Arial', fill: '#ffffff', align: 'center'};
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'menubg');
    this.startButton = this.game.add.button(this.game.width/2, 200, 'logo', this.startClick, this);
    this.startButton.anchor.setTo(0.5, 0.5);
    this.startButton.scale.setTo(0.75, 0.75);
   //  this.sprite = this.game.add.sprite(this.game.world.centerX, 200, 'logo');
   //  this.sprite.scale.setTo(0.75, 0.75);
   //  this.sprite.anchor.setTo(0.5, 0.5);

   //  this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
   //  this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click the sticker to play!', style);
    this.instructionsText.setShadow(2, 3, 'black');
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.game.add.tween(this.startButton).to({y: 190}, 500, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
  },
  update: function() {

  },
  startClick: function () {
    'use strict';
     this.game.state.start('characterselect');
  }
};

module.exports = Menu;
