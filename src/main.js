

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 640,
    height: 480,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    // zoom: 2,
    // Menu , Overworld
    scene: []
}

const game = new Phaser.Game(config)