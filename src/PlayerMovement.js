var cocos = require('cocos2d');
var events = require('events')
	, geom  = require('geometry');

function PlayerMovement (direction) {
	//var playerPos = this.position;
	var playerSpeed = this.velocity;
	this.orientation = direction || "down";

	playerSpeed.x += direction == "right" ? this.moveSpeed : direction == "left" ? -this.moveSpeed : 0;
	playerSpeed.y += direction == "up"    ? this.moveSpeed : direction == "down" ? -this.moveSpeed : 0;

	// handle Max Speeds:
	playerSpeed.x = playerSpeed.x > this.maxSpeed ? this.maxSpeed : playerSpeed.x < -this.maxSpeed ? -this.maxSpeed : playerSpeed.x;
	playerSpeed.y = playerSpeed.y > this.maxSpeed ? this.maxSpeed : playerSpeed.y < -this.maxSpeed ? -this.maxSpeed : playerSpeed.y;
	Math.abs(playerSpeed.y) < 0.1 ? playerSpeed.y = 0 : ""
	Math.abs(playerSpeed.x) < 0.1 ? playerSpeed.x = 0 : ""

}

module.exports = PlayerMovement