

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 480,
    height: 320,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    zoom: 3,
    // Menu , Overworld
    scene: [ Overworld ]
}

const game = new Phaser.Game(config)