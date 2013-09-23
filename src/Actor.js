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
    this.untouchable = false;
    this.touchabilityCounter = 0;
    this.resetPosition = new geom.Point(1000,-1000);
    this.touchabilityCounterMax = 20;
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
      if (this.untouchable) {
        this.touchabilityCounter++
        if (this.touchabilityCounter > this.touchabilityCounterMax) {
          this.touchabilityCounter = 0;
          this.untouchable = false;
        }
      }
    }

    this.height = function () {
      return this.sprite._rect.size.height;
    }
    this.width = function () {
      return this.sprite._rect.size.width;
    }

    this.hit = function () {
      this.untouchable = true;
      this.touchabilityCounter = 0;
      this.sprite.displayFrame = new SpriteFrame({ texture: new Texture2D({ file: '/resources/fuzzable_flashed.png' }), rect: new geom.Rect(0, 0, 200, 200) })
      this.delayUpdateCounter = 0;
    }


    this.velocity = new geom.Point(0, 0);
    this.alive = true
    this.handleMovement = player_movement;
    this.idleMovement = idle_movement;
    
    this.moveSpeed = 1.5;
    this.speedDecayRate = 0.95;
	  this.maxSpeed = 20.0;

    events.addListener(player, 'update', function  () {
        var playerSpeed = player.velocity;
        player.updateFrame();


        /* handle collisions */

        var map = player.parent.map;

        
        var collided = false;
        var playerPosition = new geom.Point(parseInt((player.position.x+(player.width()/2.0))/(map.meta_layer.mapTileSize.width)), parseInt((-1*player.position.y+425)/(map.meta_layer.mapTileSize.height)+1));
        var nextPosition = playerPosition;

        switch (player.orientation) {
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

        var outsideTerrain = false;

        try {

        var next_tile = map.meta_layer.tileAt(nextPosition);

        } catch (e) {
          // has left playing field
          player.position.x = player.resetPosition.x;
          player.position.y = player.resetPosition.y;
          playerSpeed.x = 0;
          playerSpeed.y = 0;
          player.boundingBox.origin.x = player.resetPosition.x;
          player.boundingBox.origin.y = player.resetPosition.y;
          outsideTerrain = true;
        }

        if (!outsideTerrain) {
        
          if (next_tile) collided = true;

          /* reverse direction based on collision */
          if (player.bounceOnCollide && collided) {
            switch (player.orientation) {
              case "down":
                if (playerSpeed.y < 0) playerSpeed.y *= -1.1;
                // player.orientation = "up";
                break;
              case "up":
                if (playerSpeed.y > 0) playerSpeed.y *= -1.1;
                // player.orientation = "down";
                break;
              case "left":
                if (playerSpeed.x < 0) playerSpeed.x *= -1.1;
                // player.orientation = "right";
                break;
              case "right":
                if (playerSpeed.x > 0) playerSpeed.x *= -1.1;
                // player.orientation = "left";
                break;
            }
          }


          // //handle Time Decay:
          player.position.x += playerSpeed.x;
          player.position.y += playerSpeed.y;

          playerSpeed.x *= player.speedDecayRate;
          playerSpeed.y *= player.speedDecayRate;
        }
    });

}

Actor.inherit(cocos.nodes.Node)

module.exports = Actor