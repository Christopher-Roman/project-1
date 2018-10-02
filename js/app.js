/***********************************************************************************************************************************
************************************************************************************************************************************
** 																															      **
**   1. The user should be able to control the sprite by moving it left, right, up, and down  									  **
**   2. The user should be able to use those controls to dodge oncoming zombies and pick up items 								  **
**   3. The user should lose a life if they run into a zombie. 																	  **
**   4. If the user hits 3 zombies without getting more lives the user will lose												  **
**   5. The user should be able to keep track of their lives																	  **
**   6. The user should be able to view their progress through the stage with a progess bar										  **
**   7. The user should be able to to see an increase in speed as the game progresses											  **
**   8. The user should be able to keep track of their fuel bar																	  **
**   9. The user should be able to pick up fuel to keep their fuel topped off													  **
**		knives/fuel randomly apearing																						      **
**  10. The user should be able to pick up knives to throw at zombies to clear them out of the way								  **
**  11. The user should have a limit to how many knives they have available to them and the ability 							  **
**     to track how many they have currently  																					  **
**  12. The user should be able to pick up or earn more lives by killing zombies that drop them over							  **
**    give points to earn additional lives  																					  **
**  (after MVP) Possible opening sequence of a non-user crashing into an obstacle before controls are handed over to teach them   **
**																															      **
************************************************************************************************************************************
***********************************************************************************************************************************/

const canvas = (document).getElementById("my-canvas");
const ctx = canvas.getContext("2d");
const clearCanvas = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// Player Class
class Player {
	constructor(fuel) {
		this.life = 3;
		this.knives = 2;
		this.fuel = fuel;
		this.x = 220
		this.y = 550;
		this.height = 100;
		this.width  = 40;
		this.up = false;
		this.down = false;
		this.left = false;
		this.right = false;
	}
	draw() {
		ctx.beginPath()
		const playerSprite = new Image();
		playerSprite.src = 'css/Player-Sprite-cutout.PNG'
		ctx.drawImage(playerSprite, this.x, this.y);
	}
	move(){
		if(this.up === true){
			this.y -= 5;
			if(this.y <= 0 ){
				this.y = 0
			}
		}
		if(this.down === true){
			this.y += 5
			if(this.y > canvas.height - this.height){
				this.y = canvas.height - this.height
			}
		}	
		if(this.right === true){
			this.x += 5
			if(this.x > canvas.width - this.width){
				this.x = canvas.width - this.width
			}
		}
		if(this.left == true){
			this.x -= 5
			if(this.x <= 0){
				this.x = 0
			}
		}
	}
	attack() {

	}
}		

const player = new Player(5)

// Zombie Class
class Zombie {
	constructor(yDirection) {
		this.health = 1;
	// shows up at the top of the screen
		this.x = Math.floor(Math.random() * 450);
		this.y = 0;
		this.xDirection = 0
		this.yDirection = 3;
		this.height = 64;
		this.width = 64;
	}
	draw(){
		ctx.beginPath()
		const zombieSprite = new Image();
		zombieSprite.src = 'css/zombie.gif'
		ctx.drawImage(zombieSprite, this.x, this.y);
	}
	isDeader(){
	}
}

// Fuel Class
class Fuel {
	constructor(yDirection) {
		this.health = 1;
		this.x = Math.floor(Math.random() * 450);
		this.y = 0;
		this.xDirection = 0
		this.yDirection = 3;
		this.height = 45;
		this.width = 45;
	}
	draw(){
		ctx.beginPath()
		const fuelSprite = new Image();
		fuelSprite.src = 'css/gasCan.png'
		ctx.drawImage(fuelSprite, this.x, this.y);
	}
}

// Knife Class
class Knife {
	constructor(yDirection) {
		this.health = 1;
		this.x = Math.floor(Math.random() * 450);
		this.y = 0;
		this.xDirection = 0
		this.yDirection = 3;
		this.height = 45;
		this.width = 45;
	}
	draw(){
		ctx.beginPath()
		const knifeSprite = new Image();
		knifeSprite.src = 'css/knife.png'
		ctx.drawImage(knifeSprite, this.x, this.y);
	}
}

// Game Object
const game = {
	zombies: [],
	fuels: [],
	knives: [],
	time: 0,
	timer: null,
	generatePlayer(){
		const player = new Player
		this.playerOne = player
		player.draw()
	},
	makeNewZombie() {
		let speed = Math.random() * 5
		const zombie = new Zombie(speed)
		game.zombies.push(zombie)
	},
	makeNewFuel() {
		const fuel = new Fuel()
		game.fuels.push(fuel)
	},
	makeNewKnife() {
		const knife = new Knife()
		game.knives.push(knife)
	},
	drawZombies() {
		for(let i = 0; i < this.zombies.length; i++) {
			this.zombies[i].draw()
		}
	},
	moveZombies() {
		for(let i = 0; i < this.zombies.length; i++){
			let speed = Math.floor(Math.random() * 5)
			this.zombies[i].y += speed
		}
	},
	moveFuels() {

		for(let i = 0; i < this.fuels.length; i++){
			this.fuels[i].y++
		}
	},
	moveKnives() {
		for(let i = 0; i < this.knives.length; i++){
			this.knives[i].y++
		}
	},
	drawFuels() {
		for(let i = 0; i < this.fuels.length; i++) {
			this.fuels[i].draw()
		}
	},
	drawKnives() {
		for(let i = 0; i < this.knives.length; i++) {
			this.knives[i].draw()
		}
	},
	playerFuel() {
			player.fuel--
	},
	gameOver() {
		if(player.life === 0 || player.fuel === 0){
			clearInterval(this.timer)
			gameOver()
		}
	},
	timer() {
			this.generatePlayer()
			this.timer = setInterval(() =>{
				if(this.time % 2 == 0) {
					this.makeNewZombie()
				}
				if(this.time % 8 == 0 && this.time > 7) {
					this.makeNewFuel()
				}
				if(this.time % 15 == 0 && this.time > 14) {
					this.makeNewKnife()
				}
				if(this.time > 4 && this.time % 5 == 0) {
					this.playerFuel()
				}
				this.gameOver()
				this.time++
				console.log(game.time);
			}, 1000)
	}
}
game.timer()

// Key Down Listener
$(document).on('keydown', (event) => {
	if(event.keyCode === 38){
		player.up = true;	
	}
	else if(event.keyCode === 40){
		player.down = true;	
	}
	else if(event.keyCode === 37){
		player.left = true;
	}
	else if(event.keyCode === 39){
		player.right = true;	
	}
})

// Key Up Listener
$(document).on('keyup', (event) => {
	if(event.keyCode === 38) {
		player.up = false;	
	}
	else if(event.keyCode === 40) {
		player.down = false;	
	}
	else if(event.keyCode === 37) {
		player.left = false;	
	}
	else if(event.keyCode === 39) {
		player.right = false;	
	}
})

// Life Text Display
const displayLives = () => {
	ctx.font = '18px arial';
	ctx.fillStyle = 'white';
	ctx.fillText('Lives: ' + player.life, 10, 22);
}

//Knife Text Display
const displayKnives = () => {
	ctx.font = '18px arial';
	ctx.fillStyle = 'white';
	ctx.fillText('Knives: ' + player.knives, 10, 45);
}
// Fuel Text Display
const displayFuel = () => {
	ctx.font = '18px arial';
	ctx.fillStyle = 'white';
	ctx.fillText('Fuel: ' + player.fuel, 10, 67);
}
// Gameover Text Display
const gameOver = () => {
	ctx.font = '35px arial';
	ctx.fillStyle = 'red';
	ctx.fillText('GAME OVER', 150, 250);
}

// Zombie Collision detection and logic
const zombieCollisionDetection = (player, zombie) => {
	for(let i = 0; i < game.zombies.length; i++) {
		if(player.x < zombie[i].x + zombie[i].width &&
			player.x + player.width > zombie[i].x &&
			player.y < zombie[i].y + zombie[i].height &&
			player.y + player.height > zombie[i].y &&
			player.life > 0) {
			player.life -= 1
			player.x = 220;
			player.y = 550;
			zombie.splice(i, 1)
		}
	}
}
// Knife Collision detection and logic
const knifeCollisionDetection = (player, knife) => {
	for(let i = 0; i < game.knives.length; i++) {
		if(player.x < knife[i].x + knife[i].width &&
			player.x + player.width > knife[i].x &&
			player.y < knife[i].y + knife[i].height &&
			player.y + player.height > knife[i].y && 
			player.knives < 20 && player.life > 0) {
			player.knives += 5
			knife.splice(i, 1)
		} else if(player.x < knife[i].x + knife[i].width &&
			player.x + player.width > knife.x &&
			player.y < knife[i].y + knife[i].height &&
			player.y + player.height > knife[i].y && 
			player.knives >= 20 && player.life > 0) {
			knife.splice(i, 1)
		}
	}
}

// Fuel Collision detection and logic
const fuelCollisionDetection = (player, fuel) => {
	for(let i = 0; i < game.fuels.length; i++) {	
		if(player.x < fuel[i].x + fuel[i].width &&
			player.x + player.width > fuel[i].x &&
			player.y < fuel[i].y + fuel[i].height &&
			player.y + player.height > fuel[i].y && 
			player.fuel < 10 && player.life > 0) {
			player.fuel += 3
			fuel.splice(i, 1)
		} else if(player.x < fuel[i].x + fuel[i].width &&
			player.x + player.width > fuel[i].x &&
			player.y < fuel[i].y + fuel[i].height &&
			player.y + player.height > fuel[i].y && 
			player.fuel >= 10 && player.life > 0) {
			fuel.splice(i, 1)
		}
	}	
}

// I will need to build a gauge that shows your progress in the level
		// Should this just be based on a timer in the game? 
		// The sprite on the gauge could just move at a set rate that is paused
		// if you hit a zombie to delay it since you will slow down a bit if that
		// happens

let counter = 0;

function animate() {
	clearCanvas()
	counter++
	game.drawZombies()
	game.drawFuels()
	game.drawKnives()
	player.draw()
	player.move()
	game.moveZombies()
	game.moveFuels()
	game.moveKnives()
	game.gameOver()
	zombieCollisionDetection(player, game.zombies)
	knifeCollisionDetection(player, game.knives)
	fuelCollisionDetection(player, game.fuels)
	displayLives()
	displayFuel()
	displayKnives()
	window.requestAnimationFrame(animate)
}
animate()









































