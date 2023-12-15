class Overworld extends Phaser.Scene {
    constructor(){
        super('overworldScene')
    }

    preload(){
        this.load.path = './assets/'
        this.load.spritesheet('gumball', 'gumball.png', {
            frameWidth: 16,
            frameHeight: 16
        })

        this.load.image('tilesetImage', 'tilemap_packed.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'overworld.json')

        this.load.audio('bgm', ['music/worldHub.mp3'])
    }

    create() {
        // constants
        this.VEL = 200

        // Tilemap
        const map = this.add.tilemap('tilemapJSON')
        // 'tileset' is the name of the tileset used in TILED
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')
        // Layers
        const bgLayer = map.createLayer('background', tileset, 0, 0)
        const detailLayer = map.createLayer('details', tileset, 0, 0)

        // add Character
        const characterSpawn = map.findObject('spawnPoints', obj => obj.name === 'playerSpawn')
        this.player = this.physics.add.sprite(characterSpawn.x, characterSpawn.y, 'gumball', 0)
        this.player.body.setCollideWorldBounds(true)

        // Character Anims
        this.anims.create({
            key: 'gumball-idle',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('gumball',{
                start: 0,
                end: 1
            })
        })
        this.player.play('gumball-idle')

        // Camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.5, 0.5)
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        // Collisions
        bgLayer.setCollisionByProperty({
            collides: true
        })
        detailLayer.setCollisionByProperty({
            collides: true
        })
        this.physics.add.collider(this.player, bgLayer)
        this.physics.add.collider(this.player, detailLayer)

        // Input
        this.cursors = this.input.keyboard.createCursorKeys()

        // Audio
        this.bgm = this.sound.add('bgm', {
            mute: false,
            loop: true,
            rate: 1,
            volume: 1
        })
        this.bgm.play()

        //timer to start battle
        this.clock = this.time.delayedCall(30000, () => {
            this.tweens.add({
                targets: bgLayer, detailLayer,
                alpha: {from: 1, to: 0},
                duration: 3000,
                onComplete: () =>{
                    this.bgm.stop()
                    this.scene.start("battleScene")
                }
            })
        })
    }

    update(){
        // player movement
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
        }

        if(this.cursors.up.isDown) {
            this.direction.y = -1
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
        }

        this.direction.normalize()
        this.player.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)

    }
}