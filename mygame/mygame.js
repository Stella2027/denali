/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
var platforms;
var cursors
var player
var stars;
var score = 0;
var scoreText;


function preload() {
    game.load.image('sky', 'assets/sky.png')
    game.load.image('ground', 'assets/platform.png')
    game.load.image('star', 'assets/star.png')
    game.load.spritesheet('dude', 'assets/dude.png',32,48)
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, "sky");
    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    var ledge = platforms.create(0, 89, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(250, 400, 'ground');
    ledge.scale.setTo(0.85, 1);
    ledge.body.immovable = true;
    ledge = platforms.create(0, 240, 'ground');
    ledge.body.immovable = true
    ledge = platforms.create(600, 100, 'ground');
    ledge.body.immovable = true
    ledge = platforms.create(400, 36)

scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    stars = game.add.group();

    stars.enableBody = true;

    for (var i = 0; i < 1000; i++)
    {
        var star = stars.create(i * 5, 0, 'star');

        star.body.gravity.y = 6;

        star.body.bounce.y = 0.9 + Math.random() * 0.2;
    }


    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.4;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();
    
}

function collectStar (player, star) {
    
    star.kill();

    score += 1;
    scoreText.text = 'Score: ' + score;

}

function update() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
   else {
        player.animations.stop();
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
 }

    

