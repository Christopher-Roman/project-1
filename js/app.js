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


// I'm going to need a user class
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
	// I'll need a draw method
		ctx.beginPath()
		// ctx.rect(this.x, this.y, this.height, this.width)
		// ctx.fillStyle = 'red'
		// ctx.fill()
		let playerSprite = new Image();
		playerSprite.src = 'css/Player-Sprite-cutout.PNG'
		ctx.drawImage(playerSprite, playerOne.x, playerOne.y);
	}
	
	// I'll need a control method
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
	// I'll need an attack method
		
	}
	isDead() {
		if(this.life === 0){
			const displayGameOver = () => {
			ctx.font = '50px arial';
			ctx.fillStyle = 'white';
			ctx.fillText('You Lose!', 250, 250);
			}
		}
	}
}

let playerOne = new Player(5)
// playerOne.move()




// I am going to need a class for Zombies
class Zombie {
	constructor(yDirection) {
		this.health = 1;
		this.x = Math.floor(Math.random() * 450);
		this.y = 0;
		this.xDirection = 0
		this.yDirection = 3;
		this.height = 64;
		this.width = 64;
	}
	draw(){
	// The draw function will need to randomize the location that the zombie
		ctx.beginPath()
		// ctx.rect(this.x, this.y, this.height, this.width)
		// ctx.fillStyle = 'white'
		// ctx.fill()
		// ctx.closePath()
		// ctx.beginPath();
		let zombieSprite = new Image();
		zombieSprite.src = 'css/zombie.gif'
		ctx.drawImage(zombieSprite, zombie.x, zombie.y);
		// ctx.beginPath();



	// shows up in from the top of the screen
	// Random location/spawns values will need to be generated?
	}
	isDeader(){
		// if(this.health < 1){
		// }
	}
}
let zombie = new Zombie(3)

// zombie.draw()
	// Perhaps something within the animation function can do this?


// I am going to need a class for gas cans
class Fuel {
	constructor(speed, x){
		this.speed = speed;
		this.x = x;
	}
	draw(){
	// Random location/spawns values will need to be generated?
		
	}
	reFuel(){
		
	}
}
	// Perhaps something within the animation function can do this?


// I am going to need a class for knives
class Knives {
	constructor(speed, x){
		this.speed = speed;
		this.x = x;
	}
	draw(){
	// Random location/spawns values will need to be generated?

	}
	damage(){
		
	}
}
	// Perhaps something within the animation function can do this?




// I will need a game object
		// The game object can run on an interval to spawn
		// the various things in the level based on random values
		// the interval can run a timer that will help control the
		// progress bar and deplete fuel
const game = {
	zombies: [],
	makeNewZombie() {

	},
	timer() {

	},
	drawZombies() {

	}
}

$(document).on('keydown', (event) => {
		// The listeners will be used for movement
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

$(document).on('keyup', (event) => {
		// The listeners will be used for movement
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

// I'm going to need to build collision detection that has different effects depending on what is hit
		// Detection for Zombies hitting the player
			// Knife hitting zombie

		// Detection for knives being picked up

		// Detection for gas cans being picked up


// I will need to build a fuel bar 
		// It will need to decrease over time 
		// It will need to increase when a gas can is picked up


// I will need to build a knife counter 
		// It will increase by one up to a max of five when knives are picked up
		// It will decrease by one when a knife is used


// I will need to build a gauge that shows your progress in the level
		// Should this just be based on a timer in the game? 
		// The sprite on the gauge could just move at a set rate that is paused
		// if you hit a zombie to delay it since you will slow down a bit if that
		// happens


// will need to build a counter for the player's lives:
const displayLives = () => {
	ctx.font = '18px arial';
	ctx.fillStyle = 'white';
	ctx.fillText('Lives: ' + playerOne.life, 10, 22);
}

const displayKnives = () => {
	ctx.font = '18px arial';
	ctx.fillStyle = 'white';
	ctx.fillText('Knives: ' + playerOne.knives, 10, 45);
}

const displayFuel = () => {
	ctx.font = '18px arial';
	ctx.fillStyle = 'white';
	ctx.fillText('Fuel: ' + playerOne.fuel, 10, 67);
}
		// It will increase if a life is picked up
		// It will decrease if the player runs into a zombie



// This function will draw the sprite over the player object.
// I am going to need user variables that will house the 
	// sprites for the user.
// const spriteDraw = () => {
// 	let playerSprite = new Image();
// 	playerSprite.src = 'css/Player-Sprite-cutout.PNG'
// 	ctx.drawImage(playerSprite, playerOne.x, playerOne.y);
// 	ctx.beginPath();
// }
// spriteDraw()

// 	// zombieSprite.onload = () => {
// const zombieDraw = () => {
// 	let zombieSprite = new Image();
// 	ctx.drawImage(zombieSprite, zombie.x, zombie.y);
// 	ctx.beginPath();
// 	zombieSprite.src = 'css/zombie.gif'
// }
// zombieDraw()

// I will need to build key listeners into the player object
	// This will clear the canvas every time one of the event listeners
	// is triggered
	clearCanvas()
	// This will redraw the playerOne object every time the event
	// listener is triggered
	// playerOne.draw()
	// This calls the draw sprite function to overlay the sprite on the
	// player object
	// spriteDraw()
	// zombieDraw()
	// Display Player Lives
	displayLives()
	// Display Fuel
	displayFuel()
	// display Knives
	displayKnives()

		// Throwing knives
		// Pausing the game?
// Timer and animation for the game

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

let counter = 0;

function animate() {
	clearCanvas()
	counter++
	// console.log("counter: " + counter);
	zombie.y++
	// ctx.drawImage(zombie, zombie.x, zombie.y)
	// This calls the draw sprite function to overlay the sprite on the
	// player object
	zombie.draw()
	// zombieDraw()
	playerOne.draw()
	playerOne.move()
	// spriteDraw()
	// Display Player stats:
	zombieCollisionDetection(playerOne, zombie)
	displayLives()
	displayFuel()
	displayKnives()
	// Function recursion
	window.requestAnimationFrame(animate)
}
// playerOne.isDead()
animate()
















































