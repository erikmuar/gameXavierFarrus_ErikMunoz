namespace SpriteKind {
    export const Icono = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursor.overlapsWith(icono_arquero)) {
    	
    }
})
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
let icono_arquero: Sprite = null
let cursor: Sprite = null
let enemigo_velocidad = 0
tiles.loadMap(tiles.createSmallMap(tilemap`map`))
enemigo_velocidad = 50
tiles.coverAllTiles(assets.tile`abajo1`, assets.tile`miMosaico`)
tiles.coverAllTiles(assets.tile`izquierda0`, assets.tile`miMosaico`)
tiles.coverAllTiles(assets.tile`arriba0`, assets.tile`miMosaico`)
tiles.coverAllTiles(assets.tile`derecha`, assets.tile`miMosaico`)
tiles.coverAllTiles(assets.tile`doblesentido`, assets.tile`miMosaico`)
cursor = sprites.create(img`
    . . . . . . . . . f . . 
    . . . . . . . . f 1 f . 
    . . . . . . . . f 1 f . 
    . . . . . . . . f 1 f . 
    . f . f . f . f f 1 f . 
    f 1 f 1 f 1 f 1 1 1 f . 
    f 1 1 1 1 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 1 1 1 1 f 
    . f 1 1 1 1 1 1 1 1 f . 
    . . f f f f f f f f . . 
    `, SpriteKind.Player)
controller.moveSprite(cursor, 70, 70)
cursor.setFlag(SpriteFlag.GhostThroughWalls, true)
icono_arquero = sprites.create(img`
    . 6 6 6 6 6 6 . 
    6 9 9 9 9 9 9 6 
    6 9 6 6 6 6 9 6 
    6 6 6 6 6 6 6 6 
    6 9 f 1 1 f 9 6 
    6 9 1 3 3 1 9 6 
    6 9 9 9 9 9 9 6 
    . 6 6 6 6 6 6 . 
    `, SpriteKind.Icono)
icono_arquero.top = 1
icono_arquero.left = 80
game.onUpdateInterval(500, function () {
    nuevo_enemigo = sprites.create(img`
        3 3 3 3 3 3 3 3 
        3 3 8 3 3 3 8 3 
        3 3 3 3 3 3 3 3 
        3 3 3 3 3 3 3 3 
        3 8 8 3 3 3 3 3 
        3 3 8 8 3 3 3 3 
        3 3 3 8 8 8 3 3 
        3 3 3 3 3 3 3 3 
        `, SpriteKind.Enemy)
    tiles.placeOnRandomTile(nuevo_enemigo, assets.tile`myTile`)
    nuevo_enemigo.vy = enemigo_velocidad
})
