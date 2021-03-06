var cocos = require('cocos2d')
	, events = require('events')
	, Texture2D = cocos.Texture2D
	, SpriteFrame   = cocos.SpriteFrame
	, geom  = require('geometry')
	, Actor = require('/Actor')

function Player() {
	Player.superclass.constructor.call(this)
	this.name = "Player";
	var player = this;

	// var texture = new Texture2D({ file: '/resources/player.png' })

	// this.animFrames = [ new SpriteFrame({ texture: texture, rect: new geom.Rect(0 * 10, 0 * 20, 10, 20) })
	//                   , new SpriteFrame({ texture: texture, rect: new geom.Rect(1 * 10, 0 * 20, 10, 20) })
	//                   , new SpriteFrame({ texture: texture, rect: new geom.Rect(2 * 10, 0 * 20, 10, 20) })
	//                   , new SpriteFrame({ texture: texture, rect: new geom.Rect(0 * 10, 1 * 20, 10, 20) })
	//                   , new SpriteFrame({ texture: texture, rect: new geom.Rect(1 * 10, 1 * 20, 10, 20) })
	//                   , new SpriteFrame({ texture: texture, rect: new geom.Rect(2 * 10, 1 * 20, 10, 20) })
	//                  ]

	var texture_up = new Texture2D({ file: '/resources/simple_player_up.png' });
	var texture_down = new Texture2D({ file: '/resources/simple_player_down.png' });
	var texture_right = new Texture2D({ file: '/resources/simple_player_right.png' });
	var texture_left = new Texture2D({ file: '/resources/simple_player_left.png' });

	this.animationFrames = {
		"up":   [ new SpriteFrame({ texture: texture_up, rect: new geom.Rect(0 * 45, 0 * 45, 46, 46) })
			  , new SpriteFrame({ texture: texture_up, rect: new geom.Rect(1 * 47, 0 * 45, 46, 46) })
			  , new SpriteFrame({ texture: texture_up, rect: new geom.Rect(0 * 45, 1 * 47, 46, 46) })
			  , new SpriteFrame({ texture: texture_up, rect: new geom.Rect(1 * 47, 0 * 45, 46, 46) })
				 ],
		"down": [ new SpriteFrame({ texture: texture_down, rect: new geom.Rect(81, 1 *  34, 46, 46) })
			  , new SpriteFrame({ texture: texture_down, rect: new geom.Rect(34, 1 *  81, 46, 46) })
			  , new SpriteFrame({ texture: texture_down, rect: new geom.Rect(81, 1 * 81, 46, 46) })
			  , new SpriteFrame({ texture: texture_down, rect: new geom.Rect(34, 1 * 81, 46, 46) })
				 ],
		"left": [ new SpriteFrame({ texture: texture_left, rect: new geom.Rect(0, 81, 46, 46) })
			  , new SpriteFrame({ texture: texture_left, rect: new geom.Rect(0, 34, 46, 46) })
			  , new SpriteFrame({ texture: texture_left, rect: new geom.Rect(47, 81, 46, 46) })
			  , new SpriteFrame({ texture: texture_left, rect: new geom.Rect(0, 34, 46, 46) })
				 ],
		"right":[ new SpriteFrame({ texture: texture_right, rect: new geom.Rect(81, 47, 46, 46)  })
			  , new SpriteFrame({ texture: texture_right, rect: new geom.Rect(34, 0, 46, 46)  })
			  , new SpriteFrame({ texture: texture_right, rect: new geom.Rect(81, 47, 46, 46) })
			  , new SpriteFrame({ texture: texture_right, rect: new geom.Rect(81, 0, 46, 46)  })
				]
	}

	this.animFrames    = function () {return this.animationFrames[this.orientation]}
	
	this.frameNumber   = 0;
	var sprite         = new cocos.nodes.Sprite({frame: this.animFrames()[this.frameNumber]});
	this.sprite        = sprite;
	sprite.anchorPoint = new geom.Point(0, 0);

	this.addChild({child: sprite});
	this.contentSize = sprite.contentSize;


	events.addListener(player, 'update', function  () {
		var map = player.parent.map;

		for (var i=0;i<map.parent.children.length;i++) {
			if (map.parent.children[i].name != 'Fuzzable' && map.parent.children[i].name != 'Grizzable')
				continue;
			var r1  = {origin: {x:player.position.x, y:player._position.y}, size: player.boundingBox.size},
		          r2  = map.parent.children[i].boundingBox;
			if (!map.parent.children[i].untouchable && geom.rectOverlapsRect(r1, r2)) {
				map.parent.children[i].hit();
				map.parent.children[i].velocity.y += 0.9*player.velocity.y;
				map.parent.children[i].velocity.x += 0.9*player.velocity.x;
				/* bounce back: */
				
				// player.velocity.x *= -1.0;
				// player.velocity.y *= -1.0;
			}
		}
	});
}

Player.inherit(Actor)

module.exports = Player