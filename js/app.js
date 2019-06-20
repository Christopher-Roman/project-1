// Animation Handler for Pausing the Animation
let animationHandle;
let animationRunning = false;
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
**      to track how many they have currently  																					  **
**  																												     		  **
************************************************************************************************************************************
***********************************************************************************************************************************/

/*****************************************************

				Context for Canvas

*****************************************************/

const canvas = (document).getElementById("my-canvas");
const ctx = canvas.getContext("2d");
const clearCanvas = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

/*****************************************************
			Ending Images for Each Ending
*****************************************************/

const $winPicture = $('<img src="https://i.pinimg.com/originals/c5/32/09/c532096426f7313e365c22566fec1ae6.gif">')
const $losePicture = $('<img src="https://i.imgur.com/hr1m0hO.gif">')
const $outOfGasPicture = $('<img src="https://media.giphy.com/media/HhcQYmkhymMNi/giphy.gif">')

/*****************************************************

					Object Classes

*****************************************************/

// Player Class
class Player {
	constructor(fuel) {
		this.life = 3;
		this.knives = 5;
		this.projectiles = [];
		this.fuel = fuel;
		this.x = 150;
		this.y = 550;
		this.height = 100;
		this.width  = 30;
		this.up = false;
		this.down = false;
		this.left = false;
		this.right = false;
	}
	draw() {
		ctx.beginPath()
		const playerSprite = new Image();
		playerSprite.src = 'https://i.imgur.com/KKA68Jo.png'
		ctx.drawImage(playerSprite, this.x - 5, this.y);
	}
	attacks() {
		if(this.knives > 0) {
			const projectile = new Projectiles()
			this.projectiles.push(projectile)
			this.knives--
		}
	}
	drawProjectiles() {
		for(let i = 0; i < this.projectiles.length; i++){
			this.projectiles[i].draw()
		}
	}
	moveProjectiles() {
		for(let i = 0; i < this.projectiles.length; i++){
			this.projectiles[i].y -= 7
		}
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
			if(this.y > canvas.height - this.height) {
				this.y = canvas.height - this.height
			}
		}	
		if(this.right === true){
			this.x += 5
			if(this.x > canvas.width - this.width) {
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
}

// Instantiating a new player
const player = new Player(5)

class Projectiles {
	constructor(){
		this.x = player.x;
		this.y = player.y;
		this.height = 4;
		this.width = 4;
	}
	draw() {
		ctx.beginPath()
		const projectileSprite = new Image();
		projectileSprite.src = 'css/thrownKnife.png'
		ctx.drawImage(projectileSprite, this.x, this.y)
	}
}

// Zombie Class
class Zombie {
	constructor() {
		this.health = 1;
		this.x = Math.floor(Math.random() * 290);
		this.y = -67;
		this.height = 67;
		this.width = 48;
	}
	draw(){
		ctx.beginPath()
		const zombieSprite = new Image();
		zombieSprite.src = 'css/ZombieWalk.gif'
		ctx.drawImage(zombieSprite, this.x -7, this.y);
	}
}

// Fuel Class
class Fuel {
	constructor() {
		this.health = 1;
		this.x = Math.floor(Math.random() * 310);
		this.y = 0;
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
	constructor() {
		this.health = 1;
		this.x = Math.floor(Math.random() * 310);
		this.y = 0;
		this.height = 45;
		this.width = 25;
	}
	draw(){
		ctx.beginPath()
		const knifeSprite = new Image();
		knifeSprite.src = 'css/knife.png'
		ctx.drawImage(knifeSprite, this.x, this.y);
	}
}

// Background Class to make the background move
class Background {
	constructor(){
		this.x = 0;
		this.y = -1300;
	}
	draw() {
		ctx.beginPath()
		const backgroundImage = new Image();
		backgroundImage.src = 'css/background2.png'
		ctx.drawImage(backgroundImage, this.x, this.y)
	}
	moveBackground() {
		this.y += 8
		if(this.y > -649){
			this.y = -1300
		}
	}
}

// Instantiating a new background.
const backgroundOne = new Background()

/*****************************************************

					Game Object

*****************************************************/

// Game Object
const game = {
	zombies: [],
	fuels: [],
	knives: [],
	distance: 100,
	score: 0,
	timer: null,
	lossfuel: false,
	lossLife: false,
	win: false,
	makeNewZombie() {
		const zombie = new Zombie()
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
			let variable = Math.floor(Math.random() * 15)
			let speed = Math.floor(Math.random() * variable)
			this.zombies[i].y += speed
		}
	},
	moveFuels() {
		for(let i = 0; i < this.fuels.length; i++){
			this.fuels[i].y += 7
		}
	},
	moveKnives() {
		for(let i = 0; i < this.knives.length; i++){
			this.knives[i].y += 7	
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
		player.fuel -= 1
	},
	setEndConditions() {
		if(player.life === 0) {
			this.lossLife = true
			this.lossFuel = false
			this.win = false
		} else if(player.fuel <= 0) {
			this.lossFuel = true
			this.win = false
			this.lossLife = false
		} else if(this.distance <=0) {
			this.win = true
			this.lossLife = false
			this.lossFuel =false
		}
	},
	gameOver() {
		if(this.lossLife){
			$('#my-canvas').remove()
			game.loser()		
			game.loserText()		
			clearInterval(this.timer)
			cancelAnimationFrame(animationHandle)
		}
	},
	youWin() {
		if(this.win) {
			$('#my-canvas').fadeOut(1900)	
			setTimeout(function() {
			game.winner()
			game.winnerText()
			}, 2000)
			clearInterval(this.timer)
		}
	},
	outOfGas() {
		if(this.lossFuel){
			$('#my-canvas').remove()
			game.fuelLoss()	
			game.fuelText()		
			clearInterval(this.timer)
			cancelAnimationFrame(animationHandle)		
		}
	},
	winner() {
		$('.win').append($winPicture)
		$('.win').hide(3000)
	},
	winnerText() {
		$('.win-text').text('You escaped the blast radius!')
	},
	fuelLoss() {
		$('.fuelLoss').append($outOfGasPicture)
		$('.fuelLoss').hide(3200)
	},
	fuelText(){
		$('.fuelLoss-text').text('You ran out of gas...')
	},
	loser() {
		$('.lose').append($losePicture)
		$('.lose').hide(5000)
	},
	loserText() {
		$('.lose-text').text('The infected caught you...')
	},
	timer() {
		this.timer = setInterval(() =>{
			this.setEndConditions()
			this.youWin()
			this.gameOver()
			this.outOfGas()
			if(this.distance >= 51 && this.distance % 2 == 0) {
				this.makeNewZombie()
			}
			if(this.distance <= 49 && this.distance % 1 == 0) {
				this.makeNewZombie()
			}
			if(this.distance >= 51 && this.distance % 7 == 0 && this.distance < 93) {
				this.makeNewFuel()
			}
			if(this.distance <= 49 && this.distance % 8 == 0){
				this.makeNewFuel()
			}
			if(this.distance >= 51 && this.distance % 15 == 0 && this.distance < 86) {
				this.makeNewKnife()
			}
			if(this.distance <= 49 && this.distance % 20 == 0){
				this.makeNewKnife()
			}
			if(this.distance < 96 && this.distance % 5 == 0) {
				this.playerFuel()
			}
			if(this.score > 199 && this.score % 200 == 0) {
				player.life++
			}
			this.distance--
			this.score += 2
		}, 1000)
	}
}

/*****************************************

	  Event listeners for the game

*****************************************/

// Start the game timer to start
$('.start').on('click', (event) => {
	if(game.distance === 100){
		game.timer()
		animate()
		animationRunning = true;
	}
})

// Refresh page key listener
$('.refresh').on('click', (event) => {
	location.reload()
})

// Key Down Listeners
$(document).on('keydown', (event) => {
	if(event.keyCode == 38){
		player.up = true;	
	}
	else if(event.keyCode == 40){
		player.down = true;	
	}
	else if(event.keyCode == 37){
		player.left = true;
	}
	else if(event.keyCode == 39){
		player.right = true;	
	}
	else if(event.keyCode == 32){
		player.attacks()
	}
})

// Key Up Listeners
$(document).on('keyup', (event) => {
	if(event.keyCode == 38) {
		player.up = false;	
	}
	else if(event.keyCode == 40) {
		player.down = false;	
	}
	else if(event.keyCode == 37) {
		player.left = false;	
	}
	else if(event.keyCode == 39) {
		player.right = false;	
	}
})

// Pause the Animation
$(document).on('keypress', (e) => {
	if(e.key==="p") {
		if (animationRunning) {
			cancelAnimationFrame(animationHandle)
			animationRunning = false;
		}
		else {
			animate()
			animationRunning = true;
		}
	}
})

/*************************************

	Information display in Canvas

*************************************/

// Life Text Display
const displayLives = () => {
	ctx.font = '18px arial';
	ctx.fillStyle = 'white';
	ctx.fillText('Lives: ' + player.life, 10, 22);
}

// Knife Text Display
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
// Distance Traveled Display
const distanceTraveled = () => {
	ctx.font = '15px arial';
	ctx.fillStyle = 'white';
	ctx.fillText('Exit Blast Radius in ' + game.distance + 's', 187, 22);
}
// Points Display
const yourScore = () => {
	ctx.font = '20px arial';
	ctx.fillStyle = 'white';
	ctx.fillText('Score: ' + game.score, 250, 52);
}

/*****************************************************

	Object removal when things are off the screen

*****************************************************/

// Delete zombies from the array if they leave the canvas
const deleteZombies = () => {
	for(let i = 0; i < game.zombies.length; i++) {
		if(game.zombies[i].y > 800){
			game.zombies.splice(i, 1)
		}
	}
}
// Delete fuel from the array if they leave the canvas
const deleteFuel = () => {
	for(let i = 0; i < game.fuels.length; i++) {
		if(game.fuels[i].y > canvas.height){
			game.fuels.splice(i, 1)
		}
	}
}
// Delete knives from the array if they leave the canvas
const deleteKnives = () => {
	for(let i = 0; i < game.knives.length; i++) {
		if(game.knives[i].y > canvas.height){
			game.knives.splice(i, 1)
		}
	}
}
// Delete Projectiles from the array if they leave the canvas
const deleteProjectiles = () => {
	for(let i = 0; i < player.projectiles.length; i++) {
		if(player.projectiles[i].y < 0){
			player.projectiles.splice(i, 1)
		}
	}
}

/*****************************************************

	    Collision Detection for each Object

*****************************************************/

const collisionDetection = () => {

	// Zombie/Player Collision Detection
	let zombieAndPlayer = false;
	let zombieIndex = 0;
	for(let i = 0; i < game.zombies.length; i++) {
		if(player.x < game.zombies[i].x + game.zombies[i].width &&
			player.x + player.width > game.zombies[i].x &&
			player.y < game.zombies[i].y + game.zombies[i].height &&
			player.y + player.height > game.zombies[i].y &&
			player.life > 0) {
			zombieAndPlayer = true;
			zombieIndex = i;
		}
	}
	if(zombieAndPlayer == true) {
		game.zombies.splice(zombieIndex, 1)
		player.life -= 1
	}

	// Gather Knife Collision Detection
	let knifeAndPlayer = false;
	let knifeIndex = 0;
	for(let i = 0; i < game.knives.length; i++) {
		if(player.x < game.knives[i].x + game.knives[i].width &&
			player.x + player.width > game.knives[i].x &&
			player.y < game.knives[i].y + game.knives[i].height &&
			player.y + player.height > game.knives[i].y && 
			player.knives < 20 && player.life > 0) {
			knifeAndPlayer = true;
			knifeIndex = i;
		} else if(player.x < game.knives[i].x + game.knives[i].width &&
			player.x + player.width > game.knives[i].x &&
			player.y < game.knives[i].y + game.knives[i].height &&
			player.y + player.height > game.knives[i].y && 
			player.knives >= 20 && player.life > 0) {
			knifeAndPlayer = true;
			knifeIndex = i;
		}
	}
	if(knifeAndPlayer == true){
		game.knives.splice(knifeIndex, 1)
		player.knives += 5;
	}

	// Gather Fuel Collision Detection
	let fuelAndPlayer = false;
	let fuelIndex = 0;
	for(let i = 0; i < game.fuels.length; i++) {	
		if(player.x < game.fuels[i].x + game.fuels[i].width &&
			player.x + player.width > game.fuels[i].x &&
			player.y < game.fuels[i].y + game.fuels[i].height &&
			player.y + player.height > game.fuels[i].y && 
			player.life > 0 && player.fuel < 200) {
			fuelAndPlayer = true;
			fuelIndex = i;
		}
	}
	if(fuelAndPlayer == true) {
		player.fuel += 1.5
		game.fuels.splice(fuelIndex, 1)
	}

	// Projectile/Zombie Collision Detection
	let projectilesAndZombies = false;
	let zombiesIndex = 0;
	let projectilesIndex = 0;
	for(let j = 0; j < player.projectiles.length; j++){
		for(let i = 0; i < game.zombies.length; i++) {
			if( game.zombies[i].x < player.projectiles[j].x + player.projectiles[j].width &&
				game.zombies[i].x + game.zombies[i].width > player.projectiles[j].x &&
				game.zombies[i].y < player.projectiles[j].y + player.projectiles[j]. height &&
				game.zombies[i].y + game.zombies[i].height > player.projectiles[j].y) {
				projectilesAndZombies = true;
				zombiesIndex = i;
				projectilesIndex = j;
			}
		}
	}
	if(projectilesAndZombies == true) {
		game.zombies.splice(zombiesIndex, 1)
		player.projectiles.splice(projectilesIndex, 1)
		game.score += 10
	}
}

/*****************************************************

				  Animation Function

*****************************************************/

let counter = 0;
function animate() {
	counter++
	clearCanvas()
	backgroundOne.draw()
	backgroundOne.moveBackground()
	deleteZombies()
	deleteKnives()
	deleteFuel()
	deleteProjectiles()
	game.drawZombies()
	game.drawFuels()
	game.drawKnives()
	player.draw()
	player.move()
	player.drawProjectiles()
	player.moveProjectiles()
	game.moveZombies()
	game.moveFuels()
	game.moveKnives()
	collisionDetection()
	displayLives()
	displayFuel()
	displayKnives()
	distanceTraveled()
	yourScore()
	animationHandle = window.requestAnimationFrame(animate)
}
































