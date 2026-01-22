scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    if (tiles.tileIs(tiles.locationOfSprite(sprite), assets.tile`derecha`)) {
        sprite.vy = 0
        sprite.vx = enemigo_velocidad
    } else if (tiles.tileIs(tiles.locationOfSprite(sprite), assets.tile`abajo1`)) {
        sprite.vy = enemigo_velocidad
        sprite.vx = 0
    } else if (tiles.tileIs(tiles.locationOfSprite(sprite), assets.tile`izquierda0`)) {
        sprite.vy = 0
        sprite.vx = 0 - enemigo_velocidad
    } else if (tiles.tileIs(tiles.locationOfSprite(sprite), assets.tile`arriba0`)) {
        sprite.vy = 0 - enemigo_velocidad
        sprite.vx = 0
    } else if (tiles.tileIs(tiles.locationOfSprite(sprite), assets.tile`doblesentido`)) {
        sprite.vy = 0
        sprite.vx = enemigo_velocidad
        if (Math.percentChance(50)) {
            sprite.vx = 0 - enemigo_velocidad
        }
    } else {
    	
    }
})
let nuevo_enemigo: Sprite = null
let enemigo_velocidad = 0
tiles.loadMap(tiles.createSmallMap(tilemap`map`))
enemigo_velocidad = 50
game.onUpdateInterval(500, function () {
    nuevo_enemigo = sprites.create(assets.image`muñeco`, SpriteKind.Enemy)
    tiles.placeOnRandomTile(nuevo_enemigo, assets.tile`myTile`)
    nuevo_enemigo.vy = enemigo_velocidad
})
