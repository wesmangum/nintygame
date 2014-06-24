/* jshint quotmark: false */
/* global Phaser */

function ajax(url, type, data, success, dataType){
  'use strict';
  $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
}

(function e(t, n, r) {
  'use strict';
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require === 'function' && require;
                if (!u && a) {return a(o, !0);}
                if (i) {return i(o, !0);}
                throw new Error('Cannot find module ' + o);
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e);
            }, f, f.exports, e, t, n, r);
        }
        return n[o].exports;
    }
    var i = typeof require === 'function' && require;
    for (var o = 0; o < r.length; o++) {s(r[o]);}
    return s;
})({
    1: [
        function(require, module, exports) {
            'use strict';

            //global variables
            window.onload = function() {
                var game = new Phaser.Game(800, 600, Phaser.AUTO, '90s-game');

                // Game States
                game.state.add('boot', require('./states/boot'));
                game.state.add('brittney', require('./states/brittney'));
                game.state.add('characterselect', require('./states/characterselect'));
                game.state.add('gameover', require('./states/gameover'));
                game.state.add('justin', require('./states/justin'));
                game.state.add('leo', require('./states/leo'));
                game.state.add('menu', require('./states/menu'));
                game.state.add('play', require('./states/play'));
                game.state.add('preload', require('./states/preload'));


                game.state.start('boot');
            };
        }, {
            './states/boot': 8,
            './states/brittney': 9,
            './states/characterselect': 10,
            './states/gameover': 11,
            './states/justin': 12,
            './states/leo': 13,
            './states/menu': 14,
            './states/play': 15,
            './states/preload': 16
        }
    ],
    2: [
        function(require, module, exports) {
            'use strict';

            var Ground = function(game, x, y, width, height) {
                Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');

                // initialize your prefab here
                this.autoScroll(-200, 0);
                this.game.physics.arcade.enableBody(this);
                this.body.immovable = true;
            };

            Ground.prototype = Object.create(Phaser.TileSprite.prototype);
            Ground.prototype.constructor = Ground;

            Ground.prototype.update = function() {

                // write your prefab's specific update code here

            };

            module.exports = Ground;

        }, {}
    ],
    3: [
        function(require, module, exports) {
            'use strict';

            var Hammer = function(game, x, y, frame) {
                Phaser.Sprite.call(this, game, x, y, 'hammer', frame);
                this.anchor.setTo(0.5, 0.5);
                this.scale.setTo(1.4, 1.4);
                this.game.physics.arcade.enableBody(this);
                this.body.setSize(35, 60, 0, 0);
                this.body.immovable = true;
                this.body.velocity.x = -200;
                var frames = [];
                for (var i = 0; i < 80; i++) {
                    frames.push(i);
                }

                this.animations.add('dance', frames, 10, true);
                this.animations.play('dance');
            };

            Hammer.prototype = Object.create(Phaser.Sprite.prototype);
            Hammer.prototype.constructor = Hammer;

            Hammer.prototype.update = function() {
                this.lookBounds();
            };
            Hammer.prototype.lookBounds = function() {
                if (!this.inWorld) {
                    this.exists = false;
                }
            };

            module.exports = Hammer;

        }, {}
    ],
    4: [
        function(require, module, exports) {
            'use strict';

            var Obstacle = function(game, x, y, int) {
                Phaser.Sprite.call(this, game, x, y, 'obstacle' + int, 1);
                this.scale.setTo(0.25, 0.25);
                this.anchor.setTo(0.4, 0.4);
                this.game.physics.arcade.enableBody(this);
                this.body.setSize(270, 270, 0, 0);

                this.body.immovable = true;
                this.body.velocity.x = -200;
            };

            Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
            Obstacle.prototype.constructor = Obstacle;

            Obstacle.prototype.update = function() {
                this.lookBounds();
            };

            Obstacle.prototype.lookBounds = function() {
                if (!this.inWorld) {
                    this.destroy();
                }
            };

            module.exports = Obstacle;

        }, {}
    ],
    5: [
        function(require, module, exports) {
            'use strict';

            var Pizza = function(game, x, y, frame) {
                Phaser.Sprite.call(this, game, x, y, 'pizza', frame);
                this.anchor.setTo(0.5, 0.5);
                this.scale.setTo(0.3, 0.3);
                this.game.physics.arcade.enableBody(this);
                this.game.add.tween(this).to({
                    angle: 10
                }, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
                this.body.setSize(180, 180, 0, 0);
                this.body.immovable = true;
                this.body.velocity.x = -200;

            };

            Pizza.prototype = Object.create(Phaser.Sprite.prototype);
            Pizza.prototype.constructor = Pizza;

            Pizza.prototype.update = function() {
                this.lookBounds();
            };

            Pizza.prototype.lookBounds = function() {
                if (!this.inWorld) {
                    this.exists = false;
                }
            };

            module.exports = Pizza;

        }, {}
    ],
    6: [
        function(require, module, exports) {
            'use strict';

            var Scoreboard = function(game, x, y, frame) {

                var gameover;

                Phaser.Group.call(this, game);

                this.scoreboard = this.create(this.game.width / 2, 200, 'scoreboard');
                this.scoreboard.anchor.setTo(0.5, 0.5);

                gameover = this.create(this.game.width / 2, 100, 'gameover');
                gameover.anchor.setTo(0.5, 0.5);
                gameover.scale.setTo(0.5, 0.5);

                this.textScore = this.game.add.bitmapText(this.game.width / 2 - 100, 200, 'font', 'Score: ', 24);
                this.add(this.textScore);

                this.startText = this.game.add.bitmapText(this.scoreboard.width / 2 + 60, 275, 'font', 'Click to retry', 12);
                this.add(this.startText);

                this.startButton = this.game.add.button(this.game.width / 2, 325, 'startButton', this.startClick, this);
                this.startButton.anchor.setTo(0.5, 0.5);
                this.add(this.startButton);

                // this.pic = this.game.add.sprite(200, 90, 'leoDead');
                // this.add(this.pic);
                // var frames =[];
                // for (var i = 0; i < 23; i++) {
                //    frames.push(i);
                // }
                // this.pic.animations.add('play', frames, 12, true);
                // this.pic.animations.play('play');

                this.y = this.game.height;
                this.x = 0;
            };

            Scoreboard.prototype = Object.create(Phaser.Group.prototype);
            Scoreboard.prototype.constructor = Scoreboard;

            Scoreboard.prototype.update = function() {

            };

            Scoreboard.prototype.startClick = function(character) {
                $('#highscore').empty().css('visibility', 'hidden');
                $('#leaderboard').empty();
                this.game.state.start('characterselect');
            };

            Scoreboard.prototype.show = function(score) {
                this.textScore.setText('Score: ' + score.toString());
                this.game.add.tween(this).to({
                    y: 50
                }, 1000, Phaser.Easing.Bounce.Out, true);
            };

            module.exports = Scoreboard;

        }, {}
    ],
    7: [
        function(require, module, exports) {
            'use strict';

            var Slice = function(game, x, y) {
                Phaser.Sprite.call(this, game, x, y, 'slice');
                this.anchor.setTo(0.5, 0.5);
                this.scale.setTo(0.1, 0.1);
                this.game.physics.arcade.enableBody(this);
                this.body.immovable = true;
                this.body.setSize(200, 200, 0, 0);


            };

            Slice.prototype = Object.create(Phaser.Sprite.prototype);
            Slice.prototype.constructor = Slice;

            Slice.prototype.update = function() {
                this.lookBounds();
            };

            Slice.prototype.lookBounds = function() {
                if (!this.inWorld) {
                    this.exists = false;
                }
            };

            module.exports = Slice;

        }, {}
    ],
    8: [
        function(require, module, exports) {

            'use strict';

            function Boot() {}

            Boot.prototype = {
                preload: function() {
                    this.game.scale.pageAlignHorizontally = true;
                    this.game.scale.pageAlignVertically = true;
                    this.game.scale.refresh();
                    this.load.image('preloader', '../../img/preloader.gif');
                },
                create: function() {
                    this.game.input.maxPointers = 1;
                    this.game.state.start('preload');
                }
            };

            module.exports = Boot;

        }, {}
    ],
    9: [
        function(require, module, exports) {

            'use strict';

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
                    this.game.physics.startSystem(Phaser.Physics.ARCADE);
                    var style = {
                        font: '20px Arial',
                        fill: '#ffffff',
                        align: 'center'
                    };

                    ajax('/leaderboards', 'get', {character: 'britney'}, function (response) {
                      $('#leaderboard').append(response);
                    }, 'html');

                    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'britneyBackground');
                    this.background.scale.setTo(1.5, 1.3);
                    this.background.autoScroll(-20, 0);

                    this.Brittney = this.game.add.sprite(100, this.game.height / 2, 'brittney2');
                    this.Brittney.anchor.setTo(0.5, 0.5);
                    this.Brittney.scale.setTo(0.4, 0.4);
                    this.game.physics.arcade.enableBody(this.Brittney);
                    this.Brittney.body.collideWorldBounds =true;
                    this.Brittney.body.setSize(180, 180, 0, 0);
                    this.game.add.tween(this.Brittney).to({
                        angle: 20
                    }, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

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
                    this.tv = this.game.add.sprite(70, this.game.height - 50, 'tv');
                    this.tv.anchor.setTo(0.5, 0.5);
                    this.tv.scale.setTo(0.3, 0.3);
                    this.scoreText = this.game.add.bitmapText(25, this.game.height - 68, 'font', this.score.toString(), 20);

                    this.cursors = this.game.input.keyboard.createCursorKeys();
                },
                update: function() {
                    this.game.physics.arcade.collide(this.Brittney, this.ground, this.deathHandler, null, this);
                    this.obstacles.forEach(function(obstacle) {
                        this.game.physics.arcade.collide(this.Brittney, obstacle, this.deathHandler, null, this);
                    }, this);
                    this.hammers.forEach(function(hammer) {
                        this.game.physics.arcade.collide(this.Brittney, hammer, this.deathHandler, null, this);
                    }, this);
                    this.pizzas.forEach(function(pizza) {
                        this.game.physics.arcade.collide(this.Brittney, pizza, this.deathHandler, null, this);
                    }, this);
                    this.slices.forEach(function(slice) {
                        this.game.physics.arcade.collide(this.Brittney, slice, this.deathHandler, null, this);
                    }, this);
                    this.Brittney.body.velocity.x = 0;
                    this.Brittney.body.velocity.y = 0;
                    var speed = 300;

                    if (this.cursors.left.isDown) {
                        this.checkStart();
                        this.Brittney.body.velocity.x = -(speed);
                    } else if (this.cursors.right.isDown) {
                        this.checkStart();
                        this.Brittney.body.velocity.x = speed;
                    }
                    if (this.cursors.up.isDown) {
                        this.checkStart();
                        this.Brittney.body.velocity.y = -(speed);
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
                generateObstacles: function() {
                    var y = this.game.rnd.integerInRange(50, 500);
                    var int = this.game.rnd.integerInRange(1, 13);
                    var obstacleCheck = this.obstacles.getFirstExists(false);
                    if (obstacleCheck) {
                        obstacleCheck.destroy();
                    }
                    var obstacle = new Obstacle(this.game, this.game.width, y, int);
                    this.obstacles.add(obstacle);
                },
                generateHammers: function() {
                    var hammerCheck = this.hammers.getFirstExists(false);
                    if (hammerCheck) {
                        hammerCheck.destroy();
                    }
                    var hammer = new Hammer(this.game, this.game.width, this.game.height - 110);
                    this.hammers.add(hammer);
                },
                generatePizzas: function() {
                    var y = this.game.rnd.integerInRange(50, 500);
                    var pizzaCheck = this.pizzas.getFirstExists(false);
                    if (pizzaCheck) {
                        pizzaCheck.destroy();
                    }
                    var pizza = new Pizza(this.game, this.game.width, y);
                    pizza.fireRate = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.fireSlices, this);
                    pizza.fireRate.timer.start();
                    this.pizzas.add(pizza);
                },
                fireSlices: function() {
                    var sliceCheck = this.slices.getFirstExists(false);
                    if (sliceCheck) {
                        sliceCheck.destroy();
                    }
                    this.pizzas.forEach(function(pizza) {
                        var slice = new Slice(this.game, pizza.world.x, pizza.world.y);
                        slice.rotation = this.game.physics.arcade.moveToObject(slice, this.Brittney, 400);
                        this.slices.add(slice);
                    }, this);
                },
                scorePoint: function() {
                    this.score++;
                    this.scoreText.setText(this.score.toString());
                },
                deathHandler: function() {
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
                    var highscore = '<p>Submit your score!</p><input type="hidden", id="character", value="britney"/><input type="hidden", id="score", value="' + this.score + '"/><input id="initials", type="text", placeholder="Your first name"/></br><button>Submit!</button>';
                    $('#highscore').append(highscore);
                    $('#highscore').css('visibility', 'visible');
                },
                checkStart: function() {
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
                shutdown: function() {
                    this.Brittney.destroy();
                    this.obstacles.destroy();
                    this.pizzas.destroy();
                    this.hammers.destroy();
                    this.scoreboard.destroy();
                }
            };

            module.exports = Brittney;

        }, {
            '../prefabs/ground': 2,
            '../prefabs/hammer': 3,
            '../prefabs/obstacle': 4,
            '../prefabs/pizza': 5,
            '../prefabs/scoreboard': 6,
            '../prefabs/slice': 7
        }
    ],
    10: [
        function(require, module, exports) {

            'use strict';

            function CharacterSelect() {}

            CharacterSelect.prototype = {
                preload: function() {

                },
                create: function() {
                    this.style = {
                        font: '20px Arial',
                        fill: '#ffffff',
                        align: 'center'
                    };
                    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'menubg');

                    this.createStars();
                    this.leoPlate = this.game.add.sprite(135, 60, 'namePlate');
                    this.leoPlate.scale.setTo(0.4, 0.5);
                    this.leoText = this.game.add.bitmapText(160, 75, 'font', 'LEO', 24);
                    this.britneyPlate = this.game.add.sprite(300, 60, 'namePlate');
                    this.britneyPlate.scale.setTo(0.65, 0.5);
                    this.brittneyText = this.game.add.bitmapText(315, 75, 'font', 'BRITNEY', 24);
                    this.justinPlate = this.game.add.sprite(545, 60, 'namePlate');
                    this.justinPlate.scale.setTo(0.55, 0.5);
                    this.justinText = this.game.add.bitmapText(555, 75, 'font', 'JUSTIN', 24);

                    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Select your character!', this.style);
                    this.instructionsText.setShadow(2, 3, 'black');
                    this.instructionsText.anchor.setTo(0.5, 0.5);
                },
                update: function() {

                },
                createStars: function() {
                    this.leo = this.game.add.button(this.game.width / 4, this.game.height / 3, 'leo', this.selectLeo, this);
                    this.leo.anchor.setTo(0.5, 0.5);
                    this.leo.scale.setTo(0.4, 0.4);
                    this.game.add.tween(this.leo).to({
                        angle: 20
                    }, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

                    this.brittney = this.game.add.button(this.game.width / 2, 240, 'brittney', this.selectBrittney, this);
                    this.brittney.anchor.setTo(0.5, 0.5);
                    this.brittney.scale.setTo(1.25, 1.25);
                    this.game.add.tween(this.brittney).to({
                        angle: 20
                    }, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

                    this.justin = this.game.add.button(this.game.width - 175, 200, 'justin', this.selectJustin, this);
                    this.justin.anchor.setTo(0.5, 0.5);
                    this.justin.scale.setTo(1.1, 1.1);
                    this.game.add.tween(this.justin).to({
                        angle: 20
                    }, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
                },
                selectLeo: function() {
                    this.selected = 'leo';
                    this.brittney.kill();
                    this.leo.kill();
                    this.justin.kill();
                    this.createStars();
                    this.createStart();
                    this.leo.kill();
                    this.leo = this.game.add.sprite(this.game.width / 4, this.game.height / 3, 'leo2');
                    this.leo.anchor.setTo(0.5, 0.5);
                    this.leo.scale.setTo(0.5, 0.5);
                    this.game.add.tween(this.leo).to({
                        angle: 20
                    }, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
                },
                selectBrittney: function() {
                    this.selected = 'brittney';
                    this.brittney.kill();
                    this.leo.kill();
                    this.justin.kill();
                    this.createStars();
                    this.createStart();
                    this.brittney.kill();
                    this.brittney = this.game.add.sprite(this.game.width / 2, 220, 'brittney2');
                    this.brittney.anchor.setTo(0.5, 0.5);
                    this.brittney.scale.setTo(0.4, 0.4);
                    this.game.add.tween(this.brittney).to({
                        angle: 20
                    }, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
                },
                selectJustin: function() {
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
                    this.game.add.tween(this.justin).to({
                        angle: 20
                    }, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
                },
                createStart: function() {
                    if (this.selected) {
                        if (this.start) {
                            this.start.destroy();
                            this.startText.destroy();
                        }
                        this.instructionsText.destroy();
                        this.start = this.game.add.button(this.game.width / 2, this.game.height - 100, 'pizza', this.startGame, this);
                        this.startText = this.game.add.text(this.game.width / 2, this.start.game.height - 100, 'START!', this.style);
                        this.start.anchor.setTo(0.5, 0.5);
                        this.start.scale.setTo(0.5, 0.5);
                        this.startText.anchor.setTo(0.5, 0.5);
                    }
                },
                startGame: function() {
                    if (this.selected === 'leo') {
                        this.game.state.start('leo');
                    } else if (this.selected === 'brittney') {
                        this.game.state.start('brittney');
                    } else if (this.selected === 'justin') {
                        this.game.state.start('justin');
                    }
                }
            };

            module.exports = CharacterSelect;

        }, {}
    ],
    11: [
        function(require, module, exports) {

            'use strict';

            function GameOver() {}

            GameOver.prototype = {
                preload: function() {

                },
                create: function() {
                    var style = {
                        font: '65px Arial',
                        fill: '#ffffff',
                        align: 'center'
                    };
                    this.titleText = this.game.add.text(this.game.world.centerX, 100, 'Game Over!', style);
                    this.titleText.anchor.setTo(0.5, 0.5);

                    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', {
                        font: '32px Arial',
                        fill: '#ffffff',
                        align: 'center'
                    });
                    this.congratsText.anchor.setTo(0.5, 0.5);

                    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', {
                        font: '16px Arial',
                        fill: '#ffffff',
                        align: 'center'
                    });
                    this.instructionText.anchor.setTo(0.5, 0.5);
                },
                update: function() {
                    if (this.game.input.activePointer.justPressed()) {
                        this.game.state.start('menu');
                    }
                }
            };
            module.exports = GameOver;

        }, {}
    ],
    12: [
        function(require, module, exports) {

            'use strict';

            function Justin() {}

            var Ground = require('../prefabs/ground');
            var Obstacle = require('../prefabs/obstacle');
            var Hammer = require('../prefabs/hammer');
            var Pizza = require('../prefabs/pizza');
            var Slice = require('../prefabs/slice');
            var Scoreboard = require('../prefabs/scoreboard');

            Justin.prototype = {
                preload: function() {

                },
                create: function() {
                    ajax('/leaderboards', 'get', {character: 'justin'}, function (response) {
                      $('#leaderboard').append(response);
                    }, 'html');

                    this.game.physics.startSystem(Phaser.Physics.ARCADE);
                    var style = {
                        font: '20px Arial',
                        fill: '#ffffff',
                        align: 'center'
                    };

                    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'justinBackground');
                    this.background.scale.setTo(1, 1);
                    this.background.autoScroll(-20, 0);

                    this.justin = this.game.add.sprite(100, this.game.height / 2, 'justin2');
                    this.justin.anchor.setTo(0.5, 0.5);
                    this.justin.scale.setTo(0.4, 0.4);
                    this.game.physics.arcade.enableBody(this.justin);
                    this.justin.body.collideWorldBounds = true;
                    this.justin.body.setSize(180, 180, 0, 0);
                    this.game.add.tween(this.justin).to({
                        angle: 20
                    }, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

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

                    this.BGMusic = this.game.add.audio('justinSong');

                    this.score = 0;
                    this.tv = this.game.add.sprite(70, this.game.height - 50, 'tv');
                    this.tv.anchor.setTo(0.5, 0.5);
                    this.tv.scale.setTo(0.3, 0.3);
                    this.scoreText = this.game.add.bitmapText(25, this.game.height - 68, 'font', this.score.toString(), 20);

                    this.cursors = this.game.input.keyboard.createCursorKeys();
                },
                update: function() {
                    this.game.physics.arcade.collide(this.justin, this.ground, this.deathHandler, null, this);
                    this.obstacles.forEach(function(obstacle) {
                        this.game.physics.arcade.collide(this.justin, obstacle, this.deathHandler, null, this);
                    }, this);
                    this.hammers.forEach(function(hammer) {
                        this.game.physics.arcade.collide(this.justin, hammer, this.deathHandler, null, this);
                    }, this);
                    this.pizzas.forEach(function(pizza) {
                        this.game.physics.arcade.collide(this.justin, pizza, this.deathHandler, null, this);
                    }, this);
                    this.slices.forEach(function(slice) {
                        this.game.physics.arcade.collide(this.justin, slice, this.deathHandler, null, this);
                    }, this);
                    this.justin.body.velocity.x = 0;
                    this.justin.body.velocity.y = 0;
                    var speed = 300;

                    if (this.cursors.left.isDown) {
                        this.checkStart();
                        this.justin.body.velocity.x = -(speed);
                    } else if (this.cursors.right.isDown) {
                        this.checkStart();
                        this.justin.body.velocity.x = speed;
                    }
                    if (this.cursors.up.isDown) {
                        this.checkStart();
                        this.justin.body.velocity.y = -(speed);
                    } else if (this.cursors.down.isDown) {
                        this.checkStart();
                        this.justin.body.velocity.y = speed;
                    }
                },
                // render: function () {
                //   this.game.debug.body(this.justin);
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
                generateObstacles: function() {
                    var y = this.game.rnd.integerInRange(50, 500);
                    var int = this.game.rnd.integerInRange(1, 13);
                    var obstacleCheck = this.obstacles.getFirstExists(false);
                    if (obstacleCheck) {
                        obstacleCheck.destroy();
                    }
                    var obstacle = new Obstacle(this.game, this.game.width, y, int);
                    this.obstacles.add(obstacle);
                },
                generateHammers: function() {
                    var hammerCheck = this.hammers.getFirstExists(false);
                    if (hammerCheck) {
                        hammerCheck.destroy();
                    }
                    var hammer = new Hammer(this.game, this.game.width, this.game.height - 110);
                    this.hammers.add(hammer);
                },
                generatePizzas: function() {
                    var y = this.game.rnd.integerInRange(50, 500);
                    var pizzaCheck = this.pizzas.getFirstExists(false);
                    if (pizzaCheck) {
                        pizzaCheck.destroy();
                    }
                    var pizza = new Pizza(this.game, this.game.width, y);
                    pizza.fireRate = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.fireSlices, this);
                    pizza.fireRate.timer.start();
                    this.pizzas.add(pizza);
                },
                fireSlices: function() {
                    var sliceCheck = this.slices.getFirstExists(false);
                    if (sliceCheck) {
                        sliceCheck.destroy();
                    }
                    this.pizzas.forEach(function(pizza) {
                        var slice = new Slice(this.game, pizza.world.x, pizza.world.y);
                        slice.rotation = this.game.physics.arcade.moveToObject(slice, this.justin, 400);
                        this.slices.add(slice);
                    }, this);
                },
                scorePoint: function() {
                    this.score++;
                    this.scoreText.setText(this.score.toString());
                },
                deathHandler: function() {
                    this.justin.destroy();
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
                    var highscore = '<p>Submit your score!</p><input type="hidden", id="character", value="justin"/><input type="hidden", id="score", value="' + this.score + '"/><input id="initials", type="text", placeholder="Your first name"/></br><button>Submit!</button>';
                    $('#highscore').append(highscore);
                    $('#highscore').css('visibility', 'visible');
                },
                checkStart: function() {
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
                shutdown: function() {
                    this.justin.destroy();
                    this.obstacles.destroy();
                    this.pizzas.destroy();
                    this.hammers.destroy();
                    this.scoreboard.destroy();
                }
            };

            module.exports = Justin;

        }, {
            '../prefabs/ground': 2,
            '../prefabs/hammer': 3,
            '../prefabs/obstacle': 4,
            '../prefabs/pizza': 5,
            '../prefabs/scoreboard': 6,
            '../prefabs/slice': 7
        }
    ],
    13: [
        function(require, module, exports) {

            'use strict';

            function Leo() {}

            var Ground = require('../prefabs/ground');
            var Obstacle = require('../prefabs/obstacle');
            var Hammer = require('../prefabs/hammer');
            var Pizza = require('../prefabs/pizza');
            var Slice = require('../prefabs/slice');
            var Scoreboard = require('../prefabs/scoreboard');

            Leo.prototype = {
                preload: function() {

                },
                create: function() {
                    ajax('/leaderboards', 'get', {character: 'leo'}, function (response) {
                      $('#leaderboard').append(response);
                    }, 'html');

                    this.game.physics.startSystem(Phaser.Physics.ARCADE);
                    var style = {
                        font: '20px Arial',
                        fill: '#ffffff',
                        align: 'center'
                    };

                    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'leoBackground');
                    this.background.scale.setTo(2, 2);
                    this.background.autoScroll(-20, 0);

                    this.leo = this.game.add.sprite(100, this.game.height / 2, 'leo2');
                    this.leo.anchor.setTo(0.5, 0.5);
                    this.leo.scale.setTo(0.4, 0.4);
                    this.game.physics.arcade.enableBody(this.leo);
                    this.leo.body.collideWorldBounds = true;
                    this.leo.body.setSize(180, 180, 0, 0);
                    this.game.add.tween(this.leo).to({
                        angle: 20
                    }, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

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

                    this.BGMusic = this.game.add.audio('leoSong');

                    this.score = 0;
                    this.tv = this.game.add.sprite(70, this.game.height - 50, 'tv');
                    this.tv.anchor.setTo(0.5, 0.5);
                    this.tv.scale.setTo(0.3, 0.3);
                    this.scoreText = this.game.add.bitmapText(25, this.game.height - 68, 'font', this.score.toString(), 20);

                    this.cursors = this.game.input.keyboard.createCursorKeys();
                },
                update: function() {
                    this.game.physics.arcade.collide(this.leo, this.ground, this.deathHandler, null, this);
                    this.obstacles.forEach(function(obstacle) {
                        this.game.physics.arcade.collide(this.leo, obstacle, this.deathHandler, null, this);
                    }, this);
                    this.hammers.forEach(function(hammer) {
                        this.game.physics.arcade.collide(this.leo, hammer, this.deathHandler, null, this);
                    }, this);
                    this.pizzas.forEach(function(pizza) {
                        this.game.physics.arcade.collide(this.leo, pizza, this.deathHandler, null, this);
                    }, this);
                    this.slices.forEach(function(slice) {
                        this.game.physics.arcade.collide(this.leo, slice, this.deathHandler, null, this);
                    }, this);
                    this.leo.body.velocity.x = 0;
                    this.leo.body.velocity.y = 0;
                    var speed = 300;

                    if (this.cursors.left.isDown) {
                        this.checkStart();
                        this.leo.body.velocity.x = -(speed);
                    } else if (this.cursors.right.isDown) {
                        this.checkStart();
                        this.leo.body.velocity.x = speed;
                    }
                    if (this.cursors.up.isDown) {
                        this.checkStart();
                        this.leo.body.velocity.y = -(speed);
                    } else if (this.cursors.down.isDown) {
                        this.checkStart();
                        this.leo.body.velocity.y = speed;
                    }
                },
                // render: function () {
                //   this.game.debug.body(this.leo);
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
                generateObstacles: function() {
                    var y = this.game.rnd.integerInRange(50, 500);
                    var int = this.game.rnd.integerInRange(1, 13);
                    var obstacleCheck = this.obstacles.getFirstExists(false);
                    if (obstacleCheck) {
                        obstacleCheck.destroy();
                    }
                    var obstacle = new Obstacle(this.game, this.game.width, y, int);
                    this.obstacles.add(obstacle);
                },
                generateHammers: function() {
                    var hammerCheck = this.hammers.getFirstExists(false);
                    if (hammerCheck) {
                        hammerCheck.destroy();
                    }
                    var hammer = new Hammer(this.game, this.game.width, this.game.height - 110);
                    this.hammers.add(hammer);
                },
                generatePizzas: function() {
                    var y = this.game.rnd.integerInRange(50, 500);
                    var pizzaCheck = this.pizzas.getFirstExists(false);
                    if (pizzaCheck) {
                        pizzaCheck.destroy();
                    }
                    var pizza = new Pizza(this.game, this.game.width, y);
                    pizza.fireRate = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.fireSlices, this);
                    pizza.fireRate.timer.start();
                    this.pizzas.add(pizza);
                },
                fireSlices: function() {
                    var sliceCheck = this.slices.getFirstExists(false);
                    if (sliceCheck) {
                        sliceCheck.destroy();
                    }
                    this.pizzas.forEach(function(pizza) {
                        var slice = new Slice(this.game, pizza.world.x, pizza.world.y);
                        slice.rotation = this.game.physics.arcade.moveToObject(slice, this.leo, 400);
                        this.slices.add(slice);
                    }, this);
                },
                scorePoint: function() {
                    this.score++;
                    this.scoreText.setText(this.score.toString());
                },
                deathHandler: function() {
                    this.leo.destroy();
                    this.tv.destroy();
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
                    var highscore = '<p>Submit your score!</p><input type="hidden", id="character", value="leo"/><input type="hidden", id="score", value="' + this.score + '"/><input id="initials", type="text", placeholder="Your first name"/></br><button>Submit!</button>';
                    $('#highscore').append(highscore);
                    $('#highscore').css('visibility', 'visible');
                },
                checkStart: function() {
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
                shutdown: function() {
                    this.leo.destroy();
                    this.obstacles.destroy();
                    this.pizzas.destroy();
                    this.hammers.destroy();
                    this.scoreboard.destroy();
                }
            };

            module.exports = Leo;

        }, {
            '../prefabs/ground': 2,
            '../prefabs/hammer': 3,
            '../prefabs/obstacle': 4,
            '../prefabs/pizza': 5,
            '../prefabs/scoreboard': 6,
            '../prefabs/slice': 7
        }
    ],
    14: [
        function(require, module, exports) {

            'use strict';

            function Menu() {}

            Menu.prototype = {
                preload: function() {

                },
                create: function() {
                    var style = {
                        font: '20px Arial',
                        fill: '#ffffff',
                        align: 'center'
                    };
                    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'menubg');
                    this.startButton = this.game.add.button(this.game.width / 2, 200, 'logo', this.startClick, this);
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

                    this.game.add.tween(this.startButton).to({
                        y: 190
                    }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
                },
                update: function() {

                },
                startClick: function() {
                    this.game.state.start('characterselect');
                }
            };

            module.exports = Menu;

        }, {}
    ],
    15: [
        function(require, module, exports) {

            'use strict';

            function Play() {}
            Play.prototype = {
                create: function() {
                    this.game.physics.startSystem(Phaser.Physics.ARCADE);
                    this.sprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'yeoman');
                    this.sprite.inputEnabled = true;

                    this.game.physics.arcade.enable(this.sprite);
                    this.sprite.body.collideWorldBounds = true;
                    this.sprite.body.bounce.setTo(1, 1);
                    this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500, 500);
                    this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500, 500);

                    this.sprite.events.onInputDown.add(this.clickListener, this);
                },
                update: function() {

                },
                clickListener: function() {
                    this.game.state.start('gameover');
                }
            };

            module.exports = Play;
        }, {}
    ],
    16: [
        function(require, module, exports) {

            'use strict';

            function Preload() {
                this.asset = null;
                this.ready = false;
            }

            Preload.prototype = {
                preload: function() {
                    this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
                    this.asset.anchor.setTo(0.5, 0.5);

                    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
                    this.load.setPreloadSprite(this.asset);
                    this.load.image('logo', '../../img/logo.jpg');
                    this.load.image('menubg', '../../img/bg2.jpg');
                    this.load.image('leo', '../../img/leo1.png');
                    this.load.image('leo2', '../../img/leo2.png');
                    this.load.image('brittney', '../../img/brittney1.png');
                    this.load.image('brittney2', '../../img/brittney2.png');
                    this.load.image('justin', '../../img/justin1.png');
                    this.load.image('justin2', '../../img/justin2.png');
                    this.load.image('pizza', '../../img/pizza.png');
                    this.load.image('slice', '../../img/pizza-slice.png');
                    this.load.image('leoBackground', '../../img/bg1.jpg');
                    this.load.image('britneyBackground', '../../img/bg3.png');
                    this.load.image('justinBackground', '../../img/bg5.jpg');

                    this.load.image('ground', '../../img/ground.png');
                    this.load.image('obstacle1', '../../img/apple.png');
                    this.load.image('obstacle2', '../../img/microsoft.png');
                    this.load.image('obstacle3', '../../img/n64.png');
                    this.load.image('obstacle4', '../../img/nick.png');
                    this.load.image('obstacle5', '../../img/mtv.png');
                    this.load.image('obstacle6', '../../img/pokemon.png');
                    this.load.image('obstacle7', '../../img/rugrats.png');
                    this.load.image('obstacle8', '../../img/bopit.png');
                    this.load.image('obstacle9', '../../img/dreamcast.png');
                    this.load.image('obstacle10', '../../img/gameboy.png');
                    this.load.image('obstacle11', '../../img/simonsays.png');
                    this.load.image('obstacle12', '../../img/vhs.png');
                    this.load.image('obstacle13', '../../img/tamagotchi.png');
                    this.load.image('tv', '../../img/tv.png');
                    this.load.spritesheet('hammer', '../../img/mchammer.png', 56, 82);
                    this.load.bitmapFont('font', '../../css/font.png', '../../css/font.fnt');
                    this.load.image('scoreboard', '../../img/scoreboard.png');
                    this.load.image('gameover', '../../img/gameover.png');
                    this.load.image('startButton', '../../img/start.png');
                    this.load.image('namePlate', '../../img/namePlate.png');

                    this.load.audio('leoSong', '../../audios/leo.mp3');
                    this.load.audio('brittneySong', '../../audios/brittney.mp3');
                    this.load.audio('justinSong', '../../audios/justin.mp3');
                    this.load.audio('secretSong', '../../audios/kimbra.mp3');


                },
                create: function() {
                    this.asset.cropEnabled = false;
                },
                update: function() {
                    if ( !! this.ready) {
                        this.game.state.start('menu');
                    }
                },
                onLoadComplete: function() {
                    this.ready = true;
                }
            };

            module.exports = Preload;

        }, {}
    ]
}, {}, [1]);
