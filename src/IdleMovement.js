var cocos = require('cocos2d');
var events = require('events')
	, geom  = require('geometry');

function IdleMovement () {
	
	var player = this;

	this.delayMovementUpdateCounter = 0;
	this.delayMovementUpdateCounterMax = 60;

	events.addListener(player, 'update', function  () {

		player.delayMovementUpdateCounter++

		if (player.delayMovementUpdateCounter > player.delayMovementUpdateCounterMax) {

			var direction = parseInt(Math.random()*5);

			switch (direction) {

				case 0:
					player.handleMovement("up");
					break;

				case 1:
					player.handleMovement("down");
					break;

				case 2:
					player.handleMovement("right");
					break;

				case 3:
					player.handleMovement("left");
					break;

				case 4:
					break;
			}
			player.delayMovementUpdateCounter = 0;
		}

	});

}

module.exports = IdleMovement