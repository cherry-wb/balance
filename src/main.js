// Import the cocos2d module
var cocos  = require('cocos2d')
  , events = require('events')
  , geom   = require('geometry')
  , Player    = require('/Player')
  , Fuzzable = require('/Fuzzable')
  , Grizzable = require('/Grizzable')
  , Map  = require('/Map')


var currentMap = "IslandMap";

function Balance (mapname) {
    // You must always call the super class version of init
    Balance.superclass.constructor.call(this)

    this.isMouseEnabled = true
    this.isKeyboardEnabled = true

    // Get size of canvas
    var s = cocos.Director.sharedDirector.winSize

    // Add Map
    // var map = new Map({"file":'/resources/level_1.tmx'})
    var map = new Map({"file":'/resources/'+mapname+'.tmx'})
    this.addChild(map)
    this.map = map

    //Add Player
    var player = new Player()
    if (map.startPosition) {
        player.position.x = map.startPosition.x;
        player.position.y = map.startPosition.y;
    }
    else {
        player.position.x =  1000;
        player.position.y = -1000;
    }
    this.addChild(player)
    this.player = player

    // Add map fuzzables
    map.placeActors(Fuzzable, 'Fuzzables');
    map.placeActors(Grizzable, 'Grizzables');
    map.follow(player);

    this.handleMovement = function (movement) {
        if (player.alive) {
            player.handleMovement(movement);
        }
    }
}



Balance.inherit(cocos.nodes.Layer, {
    bat: null,
    ball: null,

    keyPress: function (evt) {
        var movement = null;
        switch (evt.which) {
            case 115: // 40 Down
                movement = "down";
                break;
            case 122: // 38 Up
                movement = "up";
                break;
            case 100: // 39 Right
                movement = "right";
                break;
            case 113: // 37 Left
                movement = "left";
                break;
            case 114:// letter R
                currentMap == "IslandMap" ? currentMap = "level_1" : currentMap = "IslandMap";
                this.restart()
                break;
        }
        if (movement) this.handleMovement(movement);
    },

    // mouseMoved: function (evt) {
    //     // var player = this.player
    //     // var batPos = player.position
    //     // batPos.x = evt.locationInCanvas.x
    //     // player.position = batPos
    // },

    restart: function () {
        var director = cocos.Director.sharedDirector

        // Create a scene
        var scene = new cocos.nodes.Scene()

        // Add our layer to the scene
        var layer = new Balance(currentMap)
        scene.addChild(layer)

        director.replaceScene(scene)
        launchUpdates(layer);
    }
});


function launchUpdates (balance) {
    var director = cocos.Director.sharedDirector
    events.addListener(director, 'update', function () {
        for (var i=0;i<balance.children.length;i++){
            events.trigger(balance.children[i], 'update');
        }
    });
}
/**
 * Entry point for the application
 */
function main () {
    // Initialise application

    // Get director singleton
    var director = cocos.Director.sharedDirector

    // Wait for the director to finish preloading our assets
    events.addListener(director, 'ready', function (director) {
        // Create a scene and layer
        var scene = new cocos.nodes.Scene()
          , layer = new Balance(currentMap)

        layer.anchorPointInPixels.x += 200
        layer.anchorPointInPixels.y += 200


        // Add our layer to the scene
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)


        launchUpdates(layer)
    })

    // Preload our assets
    director.runPreloadScene()
}


exports.main = main
