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
    }

    create() {
        // constants
        this.VEL = 150

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

        //Input
        this.cursors = this.input.keyboard.createCursorKeys()
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