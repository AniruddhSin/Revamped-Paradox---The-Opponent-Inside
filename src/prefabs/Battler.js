class Battler extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, stats, hp){
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        this.atk = stats
        this.def = stats
        this.maxHP = hp
        this.currHP = hp
    }

    attack(target){
        target.takeDamage(this.atk)
    }

    takeDamage(damage){
        this.currHP -= Math.floor(damage/this.def)
    }
}