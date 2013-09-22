var cocos = require('cocos2d')
  , events = require('events')
  , Texture2D = cocos.Texture2D
  , SpriteFrame   = cocos.SpriteFrame
  , geom  = require('geometry')
  , player_movement = require('/PlayerMovement')
  , idle_movement = require('/IdleMovement')

function Actor () {
    Actor.superclass.constructor.call(this)

    var player = this;
    this.orientation = "down";
    this.bounceOnCollide = true;
    this.delayUpdateCounter = 0;
    this.updateFrequency = function () {return 10};
    this.updateFrame = function () {
      if (this.animFrames) {
      	this.delayUpdateCounter++
      	if (this.delayUpdateCounter > this.updateFrequency()) {
  	    	this.frameNumber++;
  	    	this.frameNumber = this.frameNumber > this.animFrames().length - 1 ? 0 : this.frameNumber;
  	    	this.sprite.displayFrame = this.animFrames()[this.frameNumber];
  	    	this.delayUpdateCounter = 0
  	    }
      }
    }

    this.height = function () {
      return this.sprite._rect.size.height;
    }
    this.width = function () {
      return this.sprite._rect.size.width;
    }

    this.velocity = new geom.Point(0, 0);
    this.alive = true
    this.handleMovement = player_movement;
    this.idleMovement = idle_movement;
    
    this.moveSpeed = 1.5;
    this.speedDecayRate = 0.95;
	  this.maxSpeed = 20.0;

    events.addListener(this, 'update', function  () {
        var playerSpeed = player.velocity;
        player.updateFrame();
        // //handle Time Decay:
        player.position.x += playerSpeed.x;
          player.position.y += playerSpeed.y;

        playerSpeed.x *= player.speedDecayRate;
        playerSpeed.y *= player.speedDecayRate;
    });

}

Actor.inherit(cocos.nodes.Node)

module.exports = Actor