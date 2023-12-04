
let keySpace

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
            debug: false
        }
    },
    zoom: 3,
    // Menu , Overworld
    scene: [ Menu , Overworld ]
}

const game = new Phaser.Game(config)
