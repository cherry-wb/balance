var cocos = require('cocos2d')
  , geom   = require('geometry')
  , events = require('events')


function Map (opts) {
    Map.superclass.constructor.call(this, opts)
    // var map = new cocos.nodes.TMXTiledMap({"file": '/resources/level_1.tmx'})
    var map = this;
    this.startPosition = new geom.Point(1000,-1000);
    this.name = "Map";
    var meta_layer = null;
    var fuzzable_layer = null;
    var antifuzzable_layer = null;
    for (var i=0;i<map.children.length;i++) {
        if (map.children[i].layerName == 'Meta') {
            meta_layer = map.children[i];
        }
        if (map.children[i].layerName == "Start") {
            for (var k=0;k<map.children[i].tiles.length;k++) {
                if (map.children[i].tiles[k] != 0)
                    map.startPosition = new geom.Point(i % map.children[i].layerSize.width,-1*(i / map.children[i].layerSize.width)+(425/map.children[i].mapTileSize.height));
            }
            map.children[i].visible = false;
        }
    }
    if (meta_layer) meta_layer.visible = false;

    this.meta_layer = meta_layer;
    var s = cocos.Director.sharedDirector.winSize;
    this.position = new geom.Point(0, s.height - map.contentSize.height)

    this.follow = function (player) {

        events.addListener(map, 'update', function  () {

            var s = cocos.Director.sharedDirector.winSize;

            map.parent._position.x = (s.width/2.0)-player.position.x;
            map.parent._position.y = (s.height/2.0)-player.position.y;

        });

    }


    this.placeActors = function (actor, layername) {
        var layer = null;
        for (var i=0;i<map.children.length;i++) {
            if (map.children[i].layerName == layername) {
                layer = map.children[i];
            }
        }
        if (layer) {
            layer.visible = false;
            for (var i=0;i<layer.tiles.length;i++) {
                if (layer.tiles[i] != 0) {
                    var actee = new actor();
                    actee.position.x = layer.mapTileSize.width * (i % layer.layerSize.width)
                    actee.position.y = -1*(layer.mapTileSize.height * (i / layer.layerSize.width))+425
                    map.parent.addChild(actee);
                }
            }
        }
    }
}

Map.inherit(cocos.nodes.TMXTiledMap)

module.exports = Map