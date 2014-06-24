var Phaser = require('phaser');
function Brittney() {}

var Ground = require('../prefabs/ground');
var Obstacle = require('../prefabs/obstacle');
var Hammer = require('../prefabs/hammer');
var Pizza = require('../prefabs/pizza');
var Slice = require('../prefabs/slice');
var Scoreboard = require('../prefabs/scoreboard');

Brittney.prototype = {

  preload: function() {

  },
  create: function() {
    'use strict';
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    var style = { font: '20px Arial', fill: '#ffffff', align: 'center'};

    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'britneyBackground');
    this.background.scale.setTo(1.5, 1.3);
    this.background.autoScroll(-20, 0);

    this.Brittney = this.game.add.sprite(100, this.game.height/2, 'brittney2');
    this.Brittney.anchor.setTo(0.5, 0.5);
    this.Brittney.scale.setTo(0.4, 0.4);
    this.game.physics.arcade.enableBody(this.Brittney);
    this.Brittney.body.setSize(180, 180, 0, 0);
    this.game.add.tween(this.Brittney).to({angle: 20}, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.obstacles = this.game.add.group();
    this.hammers = this.game.add.group();
    this.pizzas = this.game.add.group();
    this.slices = this.game.add.group();

    this.ground = new Ground(this.game, 0, this.game.height - 50, this.game.width, 112);
    this.game.add.existing(this.ground);

    this.instructionsText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Use your arrow keys to move!', style);
    this.instructionsText.setShadow(2, 3, 'black');
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.isStarted = false;

    this.BGMusic = this.game.add.audio('brittneySong');

    this.score = 0;
    this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'font', this.score.toString(), 24);

    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  update: function() {
    'use strict';

     this.game.physics.arcade.collide(this.Brittney, this.ground, this.deathHandler, null, this);
     this.obstacles.forEach(function (obstacle) {
        this.game.physics.arcade.collide(this.Brittney, obstacle, this.deathHandler, null, this);
     }, this);
     this.hammers.forEach(function (hammer) {
        this.game.physics.arcade.collide(this.Brittney, hammer, this.deathHandler, null, this);
     }, this);
     this.pizzas.forEach(function (pizza) {
        this.game.physics.arcade.collide(this.Brittney, pizza, this.deathHandler, null, this);
     }, this);
     this.slices.forEach(function (slice) {
        this.game.physics.arcade.collide(this.Brittney, slice, this.deathHandler, null, this);
     }, this);
     this.Brittney.body.velocity.x = 0;
     this.Brittney.body.velocity.y = 0;
     var speed = 300;

     if (this.cursors.left.isDown) {
        this.checkStart();
        this.Brittney.body.velocity.x =  -(speed);
     } else if (this.cursors.right.isDown) {
        this.checkStart();
        this.Brittney.body.velocity.x = speed;
     }
     if (this.cursors.up.isDown) {
        this.checkStart();
        this.Brittney.body.velocity.y =  -(speed);
     } else if (this.cursors.down.isDown) {
        this.checkStart();
        this.Brittney.body.velocity.y = speed;
     }
  },
  // render: function () {
  //   this.game.debug.body(this.Brittney);
  //   this.obstacles.forEach(function (obstacle) {
  //      this.game.debug.body(obstacle);
  //   }, this);
  //   this.pizzas.forEach(function (pizza) {
  //      this.game.debug.body(pizza);
  //   }, this);
  //   this.hammers.forEach(function (hammer) {
  //      this.game.debug.body(hammer);
  //   }, this);
  //   this.slices.forEach(function (slice) {
  //      this.game.debug.body(slice);
  //   }, this);
  // },
  generateObstacles: function () {
    'use strict';
     var y = this.game.rnd.integerInRange(50, 500);
     var int = this.game.rnd.integerInRange(1, 5);
     var obstacleCheck = this.obstacles.getFirstExists(false);
     if(obstacleCheck) {
        obstacleCheck.destroy();
     }
     var obstacle = new Obstacle(this.game, this.game.width, y, int);
     this.obstacles.add(obstacle);
  },
  generateHammers: function () {
    'use strict';

     var hammerCheck = this.hammers.getFirstExists(false);
     if (hammerCheck) {
        hammerCheck.destroy();
     }
     var hammer  = new Hammer(this.game, this.game.width, this.game.height - 110);
     this.hammers.add(hammer);
  },
  generatePizzas: function () {
    'use strict';

     var y = this.game.rnd.integerInRange(50, 500);
     var pizzaCheck = this.pizzas.getFirstExists(false);
     if (pizzaCheck) {
        pizzaCheck.destroy();
     }
     var pizza  = new Pizza(this.game, this.game.width, y);
     pizza.fireRate = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.fireSlices, this);
     pizza.fireRate.timer.start();
     this.pizzas.add(pizza);
  },
  fireSlices: function () {
    'use strict';

     var sliceCheck = this.slices.getFirstExists(false);
     if (sliceCheck) {
        sliceCheck.destroy();
     }
     this.pizzas.forEach(function (pizza) {
        var slice = new Slice(this.game, pizza.world.x, pizza.world.y);
        slice.rotation = this.game.physics.arcade.moveToObject(slice, this.Brittney, 400);
        this.slices.add(slice);
     }, this);
  },
  scorePoint: function () {
    'use strict';

     this.score++;
     this.scoreText.setText(this.score.toString());
  },
  deathHandler: function () {
    'use strict';

     this.Brittney.destroy();
     this.scoreText.destroy();
     this.obstacles.destroy();
     this.pizzas.destroy();
     this.hammers.destroy();
     this.ground.stopScroll();
     this.background.stopScroll();
     this.obstacleGenerator.timer.stop();
     this.hammerGenerator.timer.stop();
     this.pizzaGenerator.timer.stop();
     this.scoring.timer.stop();
     this.BGMusic.stop();
     this.scoreboard = new Scoreboard(this.game);
     this.game.add.existing(this.scoreboard);
     this.scoreboard.show(this.score);
  },
  checkStart: function () {
    'use strict';

     if (!this.isStarted) {
        this.isStarted = true;
        this.obstacleGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateObstacles, this);
        this.hammerGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.generateHammers, this);
        this.pizzaGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 11, this.generatePizzas, this);
        this.scoring = this.game.time.events.loop(Phaser.Timer.SECOND * 0.25, this.scorePoint, this);
        this.obstacleGenerator.timer.start();
        this.hammerGenerator.timer.start();
        this.pizzaGenerator.timer.start();
        this.scoring.timer.start();
        this.instructionsText.destroy();
        this.BGMusic.play();
     }
  },
  shutdown: function () {
    'use strict';

     this.Brittney.destroy();
     this.obstacles.destroy();
     this.pizzas.destroy();
     this.hammers.destroy();
     this.scoreboard.destroy();
  }
};

module.exports = Brittney;
