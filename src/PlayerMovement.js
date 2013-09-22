var cocos = require('cocos2d');
var events = require('events')
	, geom  = require('geometry');

function PlayerMovement (direction) {
	//var playerPos = this.position;
	var playerSpeed = this.velocity;
	this.orientation = direction || "down";
	this.resetPosition = new geom.Point(1000,-1000);

	playerSpeed.x += direction == "right" ? this.moveSpeed : direction == "left" ? -this.moveSpeed : 0;
	playerSpeed.y += direction == "up" ? this.moveSpeed : direction == "down" ? -this.moveSpeed : 0;

	// handle Max Speeds:
	playerSpeed.x = playerSpeed.x > this.maxSpeed ? this.maxSpeed : playerSpeed.x < -this.maxSpeed ? -this.maxSpeed : playerSpeed.x;
	playerSpeed.y = playerSpeed.y > this.maxSpeed ? this.maxSpeed : playerSpeed.y < -this.maxSpeed ? -this.maxSpeed : playerSpeed.y;
	Math.abs(playerSpeed.y) < 0.1 ? playerSpeed.y = 0 : ""
	Math.abs(playerSpeed.x) < 0.1 ? playerSpeed.x = 0 : ""

	// handle orientation

	/* handle collisions */

	var map = this.parent.map;
	var collided = false;
	var playerPosition = new geom.Point(parseInt((this.position.x+(this.width()/2.0))/(map.meta_layer.mapTileSize.width)), parseInt((-1*this.position.y+425)/(map.meta_layer.mapTileSize.height)+1));
	var nextPosition = playerPosition;

	switch (this.orientation) {
		case "down":
			nextPosition.y +=1;
			break;
		case "up":
			nextPosition.y -=1;
			break;
		case "left":
			nextPosition.x -=1;
			break;
		case "right":
			nextPosition.x +=1;
			break;
	}

	try {

	var next_tile = map.meta_layer.tileAt(nextPosition);

	} catch (e) {
		this.position.x = this.resetPosition.x;
		this.position.y = this.resetPosition.y;
		playerSpeed.x = 0;
		playerSpeed.y = 0;
		return
	}
	

	if (next_tile) collided = true;

	/* reverse direction based on collision */
	if (this.bounceOnCollide && collided) {
		switch (this.orientation) {
			case "down":
				if (playerSpeed.y < 0) playerSpeed.y *= -2.0;
				// this.orientation = "up";
				break;
			case "up":
				if (playerSpeed.y > 0) playerSpeed.y *= -2.0;
				// this.orientation = "down";
				break;
			case "left":
				if (playerSpeed.x < 0) playerSpeed.x *= -2.0;
				// this.orientation = "right";
				break;
			case "right":
				if (playerSpeed.x > 0) playerSpeed.x *= -2.0;
				// this.orientation = "left";
				break;
		}
	}

}


module.exports = PlayerMovement