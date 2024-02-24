class Game {
    constructor(canvas, ctx){
        this.canvas = canvas
        this.ctx = ctx
        this.height = this.canvas.height
        this.width = this.canvas.width // width and height of the class is always same as canvas 
        this.enemy1 = new Enemy(this)
        this.enemy2 = new Enemy(this)
        this.enemy3 = new Enemy(this)
        this.enemy4 = new Enemy(this)
        this.enemy5 = new Enemy(this)
        this.start()

        window.addEventListener('resize', e => { // arrow function inherit from parent class
            console.log(e)
            this.resize(e.target.innerWidth, e.target.innerHeight)
        })
    }

    start(){
        this.resize(window.innerWidth, window.innerHeight)
    }

    resize(width, height){ // custom height and width 
        this.canvas.height = height
        this.canvas.width = width
        this.width = width
        this.height = height
        this.ctx.fillStyle = 'green'
    }

    render(){
        this.ctx.fillRect(this.posX, 100, 50, 150)
        this.enemy1.draw()
        this.enemy1.update()
        this.enemy2.draw()
        this.enemy2.update()
        this.enemy3.draw()
        this.enemy3.update()
        this.enemy4.draw()
        this.enemy4.update()
        this.enemy5.draw()
        this.enemy5.update()
    }
}

window.addEventListener('load', function(){ // once everything is loaded, css, assets like 
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d') // save instance of 2d api 
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    

    const game = new Game(canvas, ctx) // creating a instance of a Game 
    
    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.render()
        requestAnimationFrame(animate)
    }
    this.requestAnimationFrame(animate)
})

