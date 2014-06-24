var Phaser = require('phaser');
function CharacterSelect() {}

CharacterSelect.prototype = {
  preload: function() {

  },
  create: function() {
    'use strict';

    this.style = { font: '20px Arial', fill: '#ffffff', align: 'center'};
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'menubg');

    this.createStars();
    this.leoText = this.game.add.bitmapText(160, 75, 'font', 'LEO', 24);
    this.brittneyText = this.game.add.bitmapText(315, 75, 'font', 'BRITTNEY', 24);
    this.justinText = this.game.add.bitmapText(555, 75, 'font', 'JUSTIN', 24);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Select your character!', this.style);
    this.instructionsText.setShadow(2, 3, 'black');
    this.instructionsText.anchor.setTo(0.5, 0.5);
  },
  update: function() {

  },
  createStars: function  () {
    'use strict';

    this.leo = this.game.add.button(this.game.width/4, this.game.height/3, 'leo', this.selectLeo, this);
    this.leo.anchor.setTo(0.5, 0.5);
    this.leo.scale.setTo(0.4, 0.4);
    this.game.add.tween(this.leo).to({angle: 20}, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.brittney = this.game.add.button(this.game.width/2, 240, 'brittney', this.selectBrittney, this);
    this.brittney.anchor.setTo(0.5, 0.5);
    this.brittney.scale.setTo(1.25, 1.25);
    this.game.add.tween(this.brittney).to({angle: 20}, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.justin = this.game.add.button(this.game.width - 175, 200, 'justin', this.selectJustin, this);
    this.justin.anchor.setTo(0.5, 0.5);
    this.justin.scale.setTo(1.1, 1.1);
    this.game.add.tween(this.justin).to({angle: 20}, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  selectLeo: function () {
    'use strict';

     this.selected = 'leo';
     this.brittney.kill();
     this.leo.kill();
     this.justin.kill();
     this.createStars();
     this.createStart();
     this.leo.kill();
     this.leo = this.game.add.sprite(this.game.width/4, this.game.height/3, 'leo2');
     this.leo.anchor.setTo(0.5, 0.5);
     this.leo.scale.setTo(0.5, 0.5);
     this.game.add.tween(this.leo).to({angle: 20}, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  selectBrittney: function () {
    'use strict';

     this.selected = 'brittney';
     this.brittney.kill();
     this.leo.kill();
     this.justin.kill();
     this.createStars();
     this.createStart();
     this.brittney.kill();
     this.brittney = this.game.add.sprite(this.game.width/2, 220, 'brittney2');
     this.brittney.anchor.setTo(0.5, 0.5);
     this.brittney.scale.setTo(0.4, 0.4);
     this.game.add.tween(this.brittney).to({angle: 20}, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  selectJustin: function () {
    'use strict';

     this.selected = 'justin';
     this.justin.kill();
     this.leo.kill();
     this.brittney.kill();
     this.createStars();
     this.createStart();
     this.justin.kill();
     this.justin = this.game.add.sprite(this.game.width - 175, 200, 'justin2');
     this.justin.anchor.setTo(0.5, 0.5);
     this.justin.scale.setTo(0.4, 0.4);
     this.game.add.tween(this.justin).to({angle: 20}, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  createStart: function  () {
    'use strict';

    if (this.selected) {
      if (this.start) {
        this.start.destroy();
        this.startText.destroy();
      }
     this.instructionsText.destroy();
     this.start = this.game.add.button(this.game.width/2, this.game.height - 100, 'pizza', this.startGame, this);
     this.startText = this.game.add.text(this.game.width/2, this.start.game.height - 100, 'START!', this.style);
     this.start.anchor.setTo(0.5, 0.5);
     this.start.scale.setTo(0.5, 0.5);
     this.startText.anchor.setTo(0.5, 0.5);
   }
  },
  startGame: function () {
    'use strict';

      if (this.selected === 'leo') {
        this.game.state.start('leo');
      } else if (this.selected === 'brittney') {
        this.game.state.start('brittney');
      } else if (this.selected === 'justin'){
        this.game.state.start('justin');
      }
   }
};

module.exports = CharacterSelect;
