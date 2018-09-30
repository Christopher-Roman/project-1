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


// I'm going to need a user class or object?
	// I'll need control methods
	// Throw methods
	

// I am going to need a class for Zombies
	// Random location/spawns values will need to be generated?
	// Perhaps something within the animation function can do this?


// I am going to need a class for gas cans
	// Random location/spawns values will need to be generated?
	// Perhaps something within the animation function can do this?


// I am going to need a class for knives
	// Random location/spawns values will need to be generated?
	// Perhaps something within the animation function can do this?



// I will need a game object
		// The game object can run on an interval to spawn
		// the various things in the level based on random values
		// the interval can run a timer that will help control the
		// progress bar and deplete fuel



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
		// It will increase if a life is picked up
		// It will decrease if the player runs into a zombie


// I will need to build key listeners into the player object
		// The listeners will be used for movement
		// Throwing knives
		// Pausing the game?















