// Components Used

/*

Tween Manager
Arcade Physics
Animation Manager
Timer Manager
Tilemaps

*/


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
    // Menu , Overworld , Battle , Credits
    scene: [ Menu , Overworld , Battle , Credits ]
}

const game = new Phaser.Game(config)
