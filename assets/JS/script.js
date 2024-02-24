class Game {
    constructor(canvas, ctx){
        this.canvas = canvas
        this.ctx = ctx
        this.height = this.canvas.height
        this.width = this.canvas.width // width and height of the class is always same as canvas 
        this.enemyPool = []
        this.numberOfEnemies = 50 
        this.createEnemyPool()
        this.enemyTimer = 0 
        this.enemyInterval = 1000

        this.mouse = {
            x: undefined,
            y: undefined,
            pressed: false
        }

        this.start()

        window.addEventListener('resize', e => { // arrow function inherit from parent class
            console.log(e)
            this.resize(e.target.innerWidth, e.target.innerHeight)
        })

        window.addEventListener('mousedown', e => {
            // e.preventDefault()
            this.mouse.x = e.x
            this.mouse.y = e.y
            console.log(e)
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
    createEnemyPool(){
        for (let i = 0; i < this.numberOfEnemies; i++){
            this.enemyPool.push(new Enemy(this))
        }
    }
    getEnemy(){
        for(let i = 0; i < this.enemyPool.length; i++){
            if (this.enemyPool[i].free) return this.enemyPool[i]
        }
    }
    handleEnemies(deltaTime){
        if(this.enemyTimer < this.enemyInterval) {
            this.enemyTimer += deltaTime
        } else {
            this.enemyTimer = 0 
            const enemy = this.getEnemy()
            if (enemy) enemy.start()
            console.log(enemy)
        }

    }
    render(deltaTime){
        this.handleEnemies(deltaTime)
        this.enemyPool.forEach(enemy => {
            enemy.update()
            enemy.draw()
        })
    }
}

window.addEventListener('load', function(){ // once everything is loaded, css, assets like 
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d') // save instance of 2d api 
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    

    const game = new Game(canvas, ctx) // creating a instance of a Game 
    
    let lastTime = 0 
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.render(deltaTime)
        requestAnimationFrame(animate)
    }
    this.requestAnimationFrame(animate)
})

