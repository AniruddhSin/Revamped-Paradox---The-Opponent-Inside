class Credits extends Phaser.Scene{
    constructor(){
        super("creditScene")
    }

    preload(){
        //audio and future fonts
        this.load.bitmapFont('gem', './assets/fonts/gem.png', './assets/fonts/gem.xml')
    }

    create(){
        
        this.add.bitmapText(game.config.width / 2, game.config.height / 9, 'gem', 'CREDITS: ', 16).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, 2*game.config.height / 9, 'gem', 'Sprites created using piskelapp.com', 16).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, 3*game.config.height / 9, 'gem', 'Tilemap created using TILED', 16).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, 4*game.config.height / 9, 'gem', 'Tileset from https://kenney.nl/assets/roguelike-modern-city', 16).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, 5*game.config.height / 9, 'gem', 'Background Audios:', 16).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, 6*game.config.height / 9, 'gem', 'https://www.youtube.com/watch?v=gZODY7wDItI', 16).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, 7*game.config.height / 9, 'gem', 'https://www.youtube.com/watch?v=lpEL1Nt6rJk&list=PL7pkSK1xbGD5EpVovZN-hmF0Yco-R5j6N&index=2', 10).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, 5*game.config.height / 9, 'gem', 'https://www.youtube.com/watch?v=9gBTKiVqprE&list=PLfP6i5T0-DkLVwacbQFT8nHfzvBRzZIeF&index=2', 10).setOrigin(0.5)
    }
}