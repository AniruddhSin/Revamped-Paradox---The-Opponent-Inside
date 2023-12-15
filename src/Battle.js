class Battle extends Phaser.Scene {
    constructor(){
        super("battleScene")
    }

    preload(){
        this.load.image('Player', './assets/gumballBattle.png')
        this.load.image('Enemy', './assets/GameEnemy.png')
        this.load.bitmapFont('gem', './assets/fonts/gem.png', './assets/fonts/gem.xml')
        this.load.audio('bgm' , './assets/music/Battle.mp3')
    }

    create(){
        // variables
        this.turnNumber = 1
        this.isPlayerTurn = true

        // add base UI
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x007700).setOrigin(0,0)
        this.add.rectangle(2, 2*game.config.height/3, game.config.width/3 - 3, game.config.height/3, 0x0000AA).setOrigin(0,0)
        this.add.rectangle(1 + game.config.width/3, 2*game.config.height/3, game.config.width/3 - 3, game.config.height/3, 0x0000AA).setOrigin(0,0)
        this.add.rectangle(2*game.config.width/3, 2*game.config.height/3, game.config.width/3 - 3, game.config.height/3, 0xFF0000).setOrigin(0,0)

        // create entities to battle
        this.player = new Battler(this, game.config.width/7, game.config.height/4, 'Player', 0, 25, 100)
        this.enemy = new Battler(this, 3*game.config.width/4, game.config.height/4, 'Enemy', 0, 200, 500)
        this.enemy.def = 1

        // add text to ui
        this.playerHP = this.add.bitmapText(10, 2*game.config.height/3 + 5, 'gem', "HP: "+this.player.currHP + '/' + this.player.maxHP, 16)
        this.enemyHP = this.add.bitmapText(5 + 2*game.config.width/3, 2*game.config.height/3 + 5, 'gem', "HP: "+this.enemy.currHP +'/'+ this.enemy.maxHP, 16)
        this.instructions = this.add.bitmapText(game.config.width/2, game.config.height/2 + 50, 'gem', "Click on the options!", 16).setOrigin(0.5)

        this.numPlayerHeals = 3
        this.playerHeals = this.add.bitmapText(10, 5*game.config.height/6, 'gem', "Heals: "+this.numPlayerHeals, 16)

        this.enemyStatus = ["Attacking" , "Charging" , "Firing", "Cooling Down", "Attacking"]
        this.currentEnemyStatus = this.enemyStatus[0]
        this.enemyStatusText = this.add.bitmapText(5 + 2*game.config.width/3, 5*game.config.height/6, 'gem', "Next: "+this.currentEnemyStatus, 16)

        // Player Options
        this.attackOption = this.add.bitmapText(6 + game.config.width/3, 5+2*game.config.height/3, 'gem', "Attack", 16)
        this.healOption = this.add.bitmapText(6 + game.config.width/3, 10+3*game.config.height/4, 'gem', "Heal", 16)
        this.blockOption = this.add.bitmapText(6 + game.config.width/3, 15+5*game.config.height/6, 'gem', "Block", 16)

        this.attackOption.setInteractive({
            useHandCursor: true
        })
        this.healOption.setInteractive({
            useHandCursor: true
        })
        this.blockOption.setInteractive({
            useHandCursor: true
        })

        // Resolve Clicking on Options
        this.attackOption.on('pointerdown', () => {
            if (this.isPlayerTurn){
                let attackTween = this.tweens.add({
                    targets: this.player,
                    x: this.enemy.x - 50,
                    angle: 360,
                    yoyo: true,
                    onComplete: () => {
                        // tween gumball to the enemy
                        this.player.attack(this.enemy)
                        // update enemy hp (on tween complete)
                        this.enemyHP.text = "HP: "+this.enemy.currHP +'/'+ this.enemy.maxHP
                        this.turnNumber += 1
                    }
                })
            }
        })

        this.healOption.on('pointerdown', () => {
            if (this.isPlayerTurn && this.numPlayerHeals > 0){
                // play heal sfx
                this.numPlayerHeals -= 1
                this.player.currHP = this.player.maxHP
                // update hp on sfx complete
                this.playerHP.text = "HP: "+this.player.currHP +'/'+ this.player.maxHP
                this.playerHeals.text = "Heals: "+this.numPlayerHeals
                this.turnNumber += 1
            }
        })

        this.blockOption.on('pointerdown', () => {
            if (this.isPlayerTurn){
                this.player.def = 1000000000
                this.turnNumber += 1
                this.tweens.add({
                    targets: this.player,
                    alpha: {from: 1, to: 0.25},
                    yoyo: true
                })
            }
        })

        this.bgm = this.sound.add('bgm', {
            mute: false,
            loop: true,
            rate: 1,
            volume: 0.5
        })
        this.bgm.play()
    }

    update(){
        if (this.turnNumber % 2 == 1){
            this.isPlayerTurn = true
            this.player.def = this.player.atk
        }else{
            this.isPlayerTurn = false
        }

        if(!this.isPlayerTurn){
            //console.log("hello")
            if (this.currentEnemyStatus == this.enemyStatus[0] || this.currentEnemyStatus == this.enemyStatus[4]){ // Attacking
                let robotAttackTween = this.tweens.add({
                    targets: this.enemy,
                    angle: -90,
                    x: this.player.x + 75,
                    yoyo: true,
                    duration: 500,
                })
                this.enemy.attack(this.player)
                if (this.player.currHP <= 0){
                    this.player.currHP = 1
                }
                this.playerHP.text = "HP: "+this.player.currHP + '/' + this.player.maxHP
                this.currentEnemyStatus = this.enemyStatus[(this.turnNumber/2)%5]
                this.turnNumber += 1
                this.enemyStatusText.text = "Next: "+this.currentEnemyStatus
            }else if (this.currentEnemyStatus == this.enemyStatus[1]){  // Charging
                this.chargeTween = this.tweens.add({
                    targets: this.enemy,
                    scaleX: 1.5,
                    scaleY: 1.5,
                    yoyo: true
                })
                this.currentEnemyStatus = this.enemyStatus[(this.turnNumber/2)%5]
                this.turnNumber += 1
                this.enemyStatusText.text = "Next: "+this.currentEnemyStatus
                this.enemy.atk *= 8
            }else if (this.currentEnemyStatus == this.enemyStatus[2]){  // Firing
                //console.log(this.enemy.atk)
                this.enemy.attack(this.player)
                if (this.player.currHP <= 0){
                    this.player.currHP = 1
                }
                this.playerHP.text = "HP: "+this.player.currHP + '/' + this.player.maxHP
                this.currentEnemyStatus = this.enemyStatus[(this.turnNumber/2)%5]
                this.turnNumber += 1
                this.enemyStatusText.fontSize = 15
                this.enemyStatusText.text = "Next: "+this.currentEnemyStatus
                this.enemy.atk /= 8
            }else if (this.currentEnemyStatus == this.enemyStatus[3]){  // Cooling Down
                this.coolingTween = this.tweens.add({
                    targets: this.enemy,
                    alpha: {from: 1, to: 0.5},
                    yoyo: true
                })
                this.currentEnemyStatus = this.enemyStatus[(this.turnNumber/2)%5]
                this.turnNumber += 1
                this.enemyStatusText.fontSize = 16
                this.enemyStatusText.text = "Next: "+this.currentEnemyStatus
            }
        }

        if(this.enemy.currHP <= 0){
            this.bgm.stop()
            this.scene.start("creditScene")
        }
    }
}
