var cocos = require('cocos2d')
  , events = require('events')
  , Texture2D = cocos.Texture2D
  , SpriteFrame   = cocos.SpriteFrame
  , geom  = require('geometry')
  , Actor  = require('/Actor')

function Fuzzable() {
	Fuzzable.superclass.constructor.call(this)
  this.name = "Grizzable";

	this.moveSpeed = 3.5;
    this.speedDecayRate = 0.99;
	this.maxSpeed = 30.0;

    // var texture = new Texture2D({ file: '/resources/sheep.png' })
    var texture = new Texture2D({ file: '/resources/grizzable.png' })

    // this.animationFrames = {
    // 	"up": [ new SpriteFrame({ texture: texture, rect: new geom.Rect(0 * 36, 2 * 36, 36, 36) })
    //           , new SpriteFrame({ texture: texture, rect: new geom.Rect(1 * 36, 2 * 36, 36, 36) })
    //           , new SpriteFrame({ texture: texture, rect: new geom.Rect(2 * 36, 2 * 36, 36, 36) })
    //           , new SpriteFrame({ texture: texture, rect: new geom.Rect(3 * 36, 2 * 36, 36, 36) })
    //          ],
    //     "down": [ new SpriteFrame({ texture: texture, rect: new geom.Rect(0 * 36, 0 * 36, 36, 36) })
    //             , new SpriteFrame({ texture: texture, rect: new geom.Rect(1 * 36, 0 * 36, 36, 36) })
    //             , new SpriteFrame({ texture: texture, rect: new geom.Rect(2 * 36, 0 * 36, 36, 36) })
    //             , new SpriteFrame({ texture: texture, rect: new geom.Rect(3 * 36, 0 * 36, 36, 36) })
    //          ],
    //     "left":[ new SpriteFrame({ texture: texture, rect: new geom.Rect(0 * 36, 1 * 36, 36, 36) })
    //            , new SpriteFrame({ texture: texture, rect: new geom.Rect(1 * 36, 1 * 36, 36, 36) })
    //            , new SpriteFrame({ texture: texture, rect: new geom.Rect(2 * 36, 1 * 36, 36, 36) })
    //            , new SpriteFrame({ texture: texture, rect: new geom.Rect(3 * 36, 1 * 36, 36, 36) })
    //          ],
    //     "right":[ new SpriteFrame({ texture: texture, rect: new geom.Rect(0 * 36, 3 * 36, 36, 36) })
    //             , new SpriteFrame({ texture: texture, rect: new geom.Rect(1 * 36, 3 * 36, 36, 36) })
    //             , new SpriteFrame({ texture: texture, rect: new geom.Rect(2 * 36, 3 * 36, 36, 36) })
    //             , new SpriteFrame({ texture: texture, rect: new geom.Rect(3 * 36, 3 * 36, 36, 36) })
    //          ]
    // }
    this.animationFrames = {
      "up": [ new SpriteFrame({ texture: texture, rect: new geom.Rect(0, 0, 200, 200) })
                , new SpriteFrame({ texture: texture, rect: new geom.Rect(0, 200, 165, 165) })
             ],
        "down": [ new SpriteFrame({ texture: texture, rect: new geom.Rect(0, 0, 200, 200) })
                , new SpriteFrame({ texture: texture, rect: new geom.Rect(0, 200, 165, 165) })
             ],
        "left":[ new SpriteFrame({ texture: texture, rect: new geom.Rect(0, 0, 200, 200) })
                , new SpriteFrame({ texture: texture, rect: new geom.Rect(0, 200, 165, 165) })
             ],
        "right":[ new SpriteFrame({ texture: texture, rect: new geom.Rect(0, 0, 200, 200) })
                , new SpriteFrame({ texture: texture, rect: new geom.Rect(0, 200, 165, 165) })
             ]
    }

    this.animFrames = function () { 	return this.animationFrames[this.orientation]}

    this.updateFrequency = function () {return 10};
    this.frameNumber = 0;
    var sprite = new cocos.nodes.Sprite({frame: this.animFrames()[this.frameNumber]});
    this.sprite = sprite;
    sprite.anchorPoint = new geom.Point(0, 0)

    this.addChild({child: sprite})
    this.contentSize = sprite.contentSize

    this.idleMovement();

}
Fuzzable.inherit(Actor)


module.exports = Fuzzable