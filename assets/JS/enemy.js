class Enemy {
    constructor(game){
        this.game = game
        this.spriteWidth = 100
        this.spriteHeight = 100 
        this.width = this.spriteWidth
        this.height = this.spriteHeight
        this.x
        this.y
        this.speedX
        this.speedY
        this.frameX
        this.frameY
        this.lastFrame
        this.minFrame
        this.maxFrame
        this.lives
        this.free = true

    }
    start(){
        this.x = Math.random() * this.game.width
        this.y = -this.height
        this.frameX = 0
        this.frameY = 3
        // this.frameY = Math.floor(Math.random() * 4)
        this.free = false
        this.lastFrame = 3
    }
    reset(){
        this.free = true
    }
    isAlive(){
        return this.lives >= 1
    }
    hit(){
        if (this.game.checkCollision(this, this.game.mouse) && this.game.mouse.pressed && !this.game.mouse.fired && this.isAlive()){
            this.lives--
            this.game.mouse.fired = true
            this.shootAudio.volume = 1
            this.shootAudio.load()
        }
    }     
    update(){
        if (!this.free){
            // float in
            if (this.y < 0) this.y += 5
            // make sure always visible
            if (this.x > this.game.width - this.width){
                this.x = this.game.width - this.width
            }

            this.x += this.speedX
            this.y += this.speedY

            // check collision
            if (this.y > this.game.height){
                this.screamAudio.volume = 1
                this.screamAudio.load()
                this.reset()
                this.game.lives--
            }

            if (!this.isAlive()) {
                if(this.game.spriteUpdate){
                    this.frameX++
                    if(this.frameX > this.lastFrame){
                        this.reset()
                        if (!this.game.gameOver) this.game.score++
                    }
                }
            }
        }
    }
    draw(){
        if (!this.free){

                this.game.ctx.drawImage(
                    this.image,
                    this.frameX * this.spriteWidth,
                    this.frameY * this.spriteHeight,
                    this.spriteWidth,
                    this.spriteHeight,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                )
        }
    }    
}

class Beetlemorph extends Enemy {
    constructor(game){
        super(game)
        this.game.enemyType = 1
        this.image = document.getElementById('beetlemorph')
        this.shootAudio = document.getElementById('beep')
        this.screamAudio = document.getElementById('scream')
    }

    start(){
        super.start()
        this.x = Math.random() * this.game.width
        this.y = -this.height
        this.speedX = 0
        this.speedY = Math.random() * 1.5 + 0.2
        this.lives = 1
        this.lastFrame = 3 

    }
    update(){
        super.update()
        if (!this.free){
            if (this.isAlive()){
                this.hit()
            }
        }
    }
}

class Phantommorph extends Enemy {
    constructor(game){
        super(game)
        
        this.game.enemyType = 3
        this.scaleX = 2
        this.scaleY = 2

        this.image = document.getElementById('phantommorph')
        this.shootAudio = document.getElementById('beep')
        
    }

    start(){
        super.start()
        this.speedX = 1
        this.speedY = 0.25
        this.lives = 2
        this.lastFrame = 12 
    }
    update(){
        super.update()
        if (!this.free){
            this.x += this.speedX

            if (this.x >= this.game.width - this.width) {
                this.speedX = -this.speedX
                this.x = this.game.width - this.width
            } 
            
            else if (this.x <= 0) {
                this.speedX = Math.abs(this.speedX)
                this.x = 0 
            }
            if (this.isAlive()){
                this.hit()
            }
        }
    }
     

}