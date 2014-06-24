
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('logo', '../../../img/logo.jpg');
    this.load.image('menubg', '../../../img/bg2.jpg');
    this.load.image('leo', '../../../img/leo1.png');
    this.load.image('leo2', '../../../img/leo2.png');
    this.load.image('brittney', '../../../img/brittney1.png');
    this.load.image('brittney2', '../../../img/brittney2.png');
    this.load.image('justin', '../../../img/justin1.png');
    this.load.image('justin2', '../../../img/justin2.png');
    this.load.image('pizza', '../../../img/pizza.jpg');
    this.load.image('slice', '../../../img/pizza-slice.png');
    this.load.image('leoBackground', '../../../img/bg1.jpg');
    this.load.image('britneyBackground', '../../../img/bg3.png');
    // this.load.image('justinBackground', '../../../img/bg4.jpg');
    this.load.image('justinBackground', '../../../img/bg5.jpg');

    this.load.image('ground', '../../../img/ground.png');
    this.load.image('obstacle1', '../../../img/apple.png');
    this.load.image('obstacle2', '../../../img/microsoft.png');
    this.load.image('obstacle3', '../../../img/n64.png');
    this.load.image('obstacle4', '../../../img/nick.png');
    this.load.image('obstacle5', '../../../img/mtv.jpeg');
    this.load.spritesheet('hammer', '../../../img/mchammer.png', 56, 82);
    this.load.spritesheet('leoDead', '../../../img/leodead.png', 400, 180);
    this.load.bitmapFont('font', '../../../css/font.png', '../../../css/font.fnt');
    this.load.image('scoreboard', '../../../img/scoreboard.png');
    this.load.image('gameover', '../../../img/gameover.png');
    this.load.image('startButton', '../../../img/start.png');

    this.load.audio('leoSong', '../../../audio/leo.mp3');
    this.load.audio('brittneySong', '../../../audio/brittney.mp3');
    this.load.audio('justinSong', '../../../audio/justin.mp3');


  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
