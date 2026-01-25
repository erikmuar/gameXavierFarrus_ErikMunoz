namespace SpriteKind {
    export const Icono = SpriteKind.create()
    export const torre = SpriteKind.create()
}
function startSwarm () {
    swarm_left_to_spawn = swarmTotal
    swarm_left_to_destroy = swarmTotal
}
function hacer_torre (nombre: string, imagen: Image, coste: number) {
    torre_nueva = sprites.create(imagen, SpriteKind.torre)
    sprites.setDataString(torre_nueva, "nombre", nombre)
    sprites.setDataNumber(torre_nueva, "coste", coste)
    return torre_nueva
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(cosa_que_sujetamos)) {
        if (cursor.overlapsWith(icono_arquero)) {
            cosa_que_sujetamos = hacer_torre("arquero", img`
                . . . . . . f f . . . . 
                . . . . f f 9 9 f . . . 
                . . . f 9 9 9 9 9 f . . 
                . . . f 9 9 9 9 9 9 f . 
                . . f 9 9 9 9 9 9 9 f . 
                . f 9 9 9 9 9 9 9 9 9 f 
                . f f f 1 f 1 f 1 f f . 
                . . . . 1 f 1 f 1 . . . 
                . . . . 1 1 3 1 1 . . . 
                . . . . e e e e e . . . 
                . . . . e e e e e . . . 
                . . . . e e e e e . . . 
                . . . . e e e e e . . . 
                . . . . e e e e e . . . 
                . . . . e e e e e . . . 
                . . . . e e e e e . . . 
                `, 1)
            cursor.setFlag(SpriteFlag.Invisible, true)
        }
    } else {
        cosa_que_sujetamos = [][0]
        cursor.setFlag(SpriteFlag.Invisible, false)
    }
})
spriteutils.createRenderable(5, function (screen2) {
    for (let value of sprites.allOfKind(SpriteKind.torre)) {
        if (sprites.readDataString(value, "nombre") == "arquero") {
            spriteutils.drawCircle(
            screen2,
            value.x,
            value.y,
            arquero_radio,
            3
            )
        }
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
    } else if (tiles.tileIs(tiles.locationOfSprite(sprite), assets.tile`miMosaico0`)) {
        sprites.destroy(sprite)
        info.changeLifeBy(-1)
    } else {
    	
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.changeDataNumberBy(otherSprite, "vida", -1)
    if (sprites.readDataNumber(otherSprite, "vida") <= 0) {
        sprites.destroy(otherSprite)
    }
})
let projectile: Sprite = null
let target: Sprite = null
let nuevo_enemigo: Sprite = null
let cosa_que_sujetamos: Sprite = null
let torre_nueva: Sprite = null
let swarm_left_to_destroy = 0
let swarm_left_to_spawn = 0
let icono_arquero: Sprite = null
let cursor: Sprite = null
let arquero_radio = 0
let swarmTotal = 0
let enemigo_velocidad = 0
tiles.loadMap(tiles.createSmallMap(tilemap`map`))
enemigo_velocidad = 20
tiles.coverAllTiles(assets.tile`abajo1`, assets.tile`miMosaico`)
tiles.coverAllTiles(assets.tile`izquierda0`, assets.tile`miMosaico`)
tiles.coverAllTiles(assets.tile`arriba0`, assets.tile`miMosaico`)
tiles.coverAllTiles(assets.tile`derecha`, assets.tile`miMosaico`)
tiles.coverAllTiles(assets.tile`doblesentido`, assets.tile`miMosaico`)
swarmTotal = 10
arquero_radio = 24
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
info.setLife(20)
startSwarm()
game.onUpdate(function () {
    if (cosa_que_sujetamos) {
        cosa_que_sujetamos.setPosition(cursor.x, cursor.y)
    }
})
game.onUpdateInterval(1000, function () {
    if (swarm_left_to_spawn > 0) {
        swarm_left_to_spawn += -1
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
        sprites.setDataNumber(nuevo_enemigo, "vida", 2)
    }
})
game.onUpdateInterval(500, function () {
    for (let value of sprites.allOfKind(SpriteKind.torre)) {
        if (sprites.readDataString(value, "nombre") == "arquero" && value != cosa_que_sujetamos) {
            target = spriteutils.getSpritesWithin(SpriteKind.Enemy, arquero_radio, value)._pickRandom()
            if (target) {
                projectile = sprites.createProjectileFromSprite(img`
                    4 4 
                    4 4 
                    `, value, 0, 0)
                spriteutils.setVelocityAtAngle(projectile, spriteutils.angleFrom(value, target), 100)
                projectile.setFlag(SpriteFlag.GhostThroughWalls, true)
            }
        }
    }
})
