class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }

    preload(){
        //audio and future fonts
        this.load.bitmapFont('gem', './assets/fonts/gem.png', './assets/fonts/gem.xml')
        this.load.audio('menuMusic', ['./assets/music/menuMusic.mp3'])
    }

    create(){
        
        this.animsFinished = false
        let firstHalf = this.add.bitmapText(game.config.width / 2, game.config.height / 5, 'gem', 'REVAMPED PARADOX: ', 48).setOrigin(0.5).setAlpha(0)
        let secondHalf = this.add.bitmapText(game.config.width / 2, game.config.height / 3, 'gem', 'The Opponent Inside', 48).setOrigin(0.5).setAlpha(0)

        let keyBindsText = this.add.bitmapText(game.config.width / 2, 3*game.config.height / 4, 'gem', 'Use arrow keys to move and SPACE to begin!', 20).setOrigin(0.5).setAlpha(0)

        this.time.delayedCall(1000, () => {
            this.tweens.add({
                targets: firstHalf,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 2000,
                ease: "Quintic.easeIn",
            })
        })
        this.time.delayedCall(3000, () => {
            this.tweens.add({
                targets: secondHalf,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 2000,
                ease: "Quintic.easeIn",
            })
        })
        this.time.delayedCall(5000, () => {
            this.tweens.add({
                targets: keyBindsText,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 2000,
                ease: "Quintic.easeIn",
            })
            this.animsFinished = true
        })

        /*let hello = this.add.bitmapText(game.config.width/2, 0, 'gem', "hello", 64).setOrigin(0)
        this.tweens.add({
            targets: hello,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 3000,
            ease: "Quintic.easeIn"
        })*/

        // set Keybind
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // audio
        this.bgm = this.sound.add('menuMusic', {
            mute: false,
            loop: true,
            rate: 1,
            volume: 1
        })
        this.bgm.play()
    }

    update(){
        if(this.animsFinished && Phaser.Input.Keyboard.JustDown(keySpace)){
            this.bgm.stop()
            this.scene.start('overworldScene')
        }
    }
}