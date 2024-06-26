import './style.css'
import Phaser from 'phaser'
import { Physics } from 'phaser'

const sizes = {
    width: 500,
    height: 500
}

const speedDown = 300

class GameScene extends Phaser.Scene{
    constructor(){
        super("scene-game")
        this.player
        this.cursor
        this.playerSpeed=speedDown+50;
        this.target
    }

    preload(){
        this.load.image("background", "/assets/background.jpeg")
        this.load.image("worm", "/assets/wormsprite.png" )
        this.load.image("wormfood", "/assets/worm.jpeg")

    }
    create(){
        this.add.image(0,0,"background").setOrigin(0,0)
        this.player = this.physics.add.image(0, sizes.height - 100, "worm").setOrigin(0, 0)
        this.player.setImmovable(true)
        this.player.body.allowGravity = false

        this.cursor=this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true)

        this.target = this.physics.add.image(0,0, "wormfood").setOrigin(0,0);
        this.target.setMaxVelocity(0, speedDown);

        this.cursor = this.input.keyboard.createCursorKeys();
    }
    update(){

        if (this.target.y >= sizes.height) {
            this.target.setY(0);
        }

        const{ left, right } = this.cursor;

        if (left.isDown) {
            this.player.setVelocityX(this.playerSpeed);
        }
        else if (right.isDown) {
                this.player.setVelocityY(this.playerSpeed);
            }
            else {
                this.player.setVelocityX(0);
            }
    }
}

const config = {
    type: Phaser.WEBGL,
    width: sizes.width,
    height: sizes.height,
    canvas:gameCanvas,
    physics: {
        default: "arcade",
        arcade:{
            gravity: {y: speedDown},
            debug: true
        }
    },
    scene: [GameScene]
}

const game = new Phaser.Game(config)