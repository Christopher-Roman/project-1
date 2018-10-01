console.log('it is linked');
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
		let playerSprite = new Image();
		playerSprite.src = 'css/Player-Sprite-cutout.PNG'
		ctx.drawImage(playerSprite, playerOne.x, playerOne.y);
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

let playerOne = new Player(5)

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
		let zombieSprite = new Image();
		zombieSprite.src = 'css/zombie.gif'
		ctx.drawImage(zombieSprite, zombie.x, zombie.y);
	}
	isDeader(){
	}
}
let zombie = new Zombie(3)

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
		let fuelSprite = new Image();
		fuelSprite.src = 'css/gasCan.png'
		ctx.drawImage(fuelSprite, fuel.x, fuel.y);
	}
}

let fuel = new Fuel(3)

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
		let knifeSprite = new Image();
		knifeSprite.src = 'css/knife.png'
		ctx.drawImage(knifeSprite, knife.x, knife.y);
	}
}

let knife = new Knife(3)

// Game Object
const game = {
	zombies: [],
	currentPlayer: null,
	timeSpan: 1,
	time: 0,
	timer: null,
	zombieIndex: 0,
	generatePlayer(){
		let player = new Player
		game.currentPlayer = player
		player.draw()
	},
	makeNewZombie() {
		if(game.time % 3 === 0){
			let zombie = new Zombie()
			game.zombies.push(zombie)
		}
	},
	timer() {
		this.timer = setInterval(function (){
			game.generatePlayer()
			game.makeNewZombie()
			game.playerFuel()
			game.gameOver()
			game.time++
			game.zombies[0].draw();
			game.zombies.y--
			console.log(game.time);
		}, 1000)

	},
	drawZombies() {
		let zombieIndex = game.zombieIndex
		if(game.time % 4){
			game.zombies[game.zombieIndex].draw()
		}
	},
	playerFuel() {
		if(game.time > 4 && game.time % 5 === 0){
			playerOne.fuel--
		}
	},
	gameOver() {
		if(playerOne.life === 0 || playerOne.fuel === 0){
			clearInterval(this.timer)
			gameOver()
		}
	}
}
game.timer()

// Key Down Listener
$(document).on('keydown', (event) => {
	if(event.keyCode === 38){
		playerOne.up = true;	
	}
	else if(event.keyCode === 40){
		playerOne.down = true;	
	}
	else if(event.keyCode === 37){
		playerOne.left = true;
	}
	else if(event.keyCode === 39){
		playerOne.right = true;	
	}
})

// Key Up Listener
$(document).on('keyup', (event) => {
	if(event.keyCode === 38) {
		playerOne.up = false;	
	}
	else if(event.keyCode === 40) {
		playerOne.down = false;	
	}
	else if(event.keyCode === 37) {
		playerOne.left = false;	
	}
	else if(event.keyCode === 39) {
		playerOne.right = false;	
	}
})

// Life Text Display
const displayLives = () => {
	ctx.font = '18px arial';
	ctx.fillStyle = 'white';
	ctx.fillText('Lives: ' + playerOne.life, 10, 22);
}

//Knife Text Display
const displayKnives = () => {
	ctx.font = '18px arial';
	ctx.fillStyle = 'white';
	ctx.fillText('Knives: ' + playerOne.knives, 10, 45);
}
// Fuel Text Display
const displayFuel = () => {
	ctx.font = '18px arial';
	ctx.fillStyle = 'white';
	ctx.fillText('Fuel: ' + playerOne.fuel, 10, 67);
}
// Gameover Text Display
const gameOver = () => {
	ctx.font = '35px arial';
	ctx.fillStyle = 'red';
	ctx.fillText('GAME OVER', 150, 250);
}

// Zombie Collision detection and logic
const zombieCollisionDetection = (player, zombie) => {
	if(player.x < zombie.x + zombie.width &&
		player.x + player.width > zombie.x &&
		player.y < zombie.y + zombie.height &&
		player.y + player.height > zombie.y) {
		playerOne.life -= 1
		player.x = 220;
		player.y = 550;
	}
}
// Knife Collision detection and logic
const knifeCollisionDetection = (player, knife) => {
	if(player.x < knife.x + knife.width &&
		player.x + player.width > knife.x &&
		player.y < knife.y + knife.height &&
		player.y + player.height > knife.y) {
		playerOne.knives += 1
	}
}

// Fuel Collision detection and logic
const fuelCollisionDetection = (player, fuel) => {
	if(player.x < fuel.x + fuel.width &&
		player.x + player.width > fuel.x &&
		player.y < fuel.y + fuel.height &&
		player.y + player.height > fuel.y) {
		playerOne.fuel += 1
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
	zombie.y++
	fuel.y++
	knife.y++
	fuel.draw()
	knife.draw()
	playerOne.draw()
	zombie.draw()
	playerOne.move()
	game.gameOver()
	zombieCollisionDetection(playerOne, zombie)
	knifeCollisionDetection(playerOne, knife)
	fuelCollisionDetection(playerOne, fuel)
	displayLives()
	displayFuel()
	displayKnives()
	window.requestAnimationFrame(animate)
}
animate()









































