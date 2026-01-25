namespace SpriteKind {
    export const Icono = SpriteKind.create()
    export const torre = SpriteKind.create()
}

function startSwarm() {
    
    swarm_left_to_spawn = swarmTotal
    swarm_left_to_destroy = swarmTotal
}

function hacer_torre(nombre: string, imagen: Image, coste: number): Sprite {
    
    torre_nueva = sprites.create(imagen, SpriteKind.torre)
    sprites.setDataString(torre_nueva, "nombre", nombre)
    sprites.setDataNumber(torre_nueva, "coste", coste)
    return torre_nueva
}

function daño_electrical(sprite: Sprite, daño: number) {
    sprites.changeDataNumberBy(sprite, "vida", 0 - daño)
    if (sprites.readDataNumber(sprite, "vida") <= 0) {
        sprites.destroy(sprite)
        info.changeScoreBy(1)
    }
    
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    if (!cosa_que_sujetamos) {
        if (cursor.overlapsWith(icono_arquero)) {
            if (info.score() >= 20) {
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
                        `, 10)
                cursor.setFlag(SpriteFlag.Invisible, true)
                info.changeScoreBy(-20)
            }
            
        } else if (cursor.overlapsWith(icono_electric)) {
            if (info.score() >= 20) {
                cosa_que_sujetamos = hacer_torre("electric", img`
                        . . . . . . f f . . . .
                        . . . . f f 7 7 f . . .
                        . . . f 7 7 7 7 7 f . .
                        . . . f 7 7 7 7 7 7 f .
                        . . f 7 7 7 7 7 7 7 f .
                        . f 7 7 7 7 7 7 7 7 7 f
                        . f f f 1 2 1 2 1 f f .
                        . . . . 1 2 1 2 1 . . .
                        . . . . 1 1 3 1 1 . . .
                        . . . . 9 9 9 9 9 . . .
                        . . . . 9 9 9 9 9 . . .
                        . . . . 9 9 9 9 9 . . .
                        . . . . 9 9 9 9 9 . . .
                        . . . . 9 9 9 9 9 . . .
                        . . . . 9 9 9 9 9 . . .
                        . . . . 9 9 9 9 9 . . .
                        `, 10)
                cursor.setFlag(SpriteFlag.Invisible, true)
                info.changeScoreBy(-20)
            }
            
        } else {
            
        }
        
    } else {
        cosa_que_sujetamos = [][0]
        cursor.setFlag(SpriteFlag.Invisible, false)
    }
    
})
info.onCountdownEnd(function on_countdown_end() {
    startSwarm()
})
spriteutils.createRenderable(5, function on_create_renderable(screen2: Image) {
    for (let value of sprites.allOfKind(SpriteKind.torre)) {
        if (sprites.readDataString(value, "nombre") == "arquero") {
            spriteutils.drawCircle(screen2, value.x, value.y, arquero_radio, 3)
        }
        
    }
    for (let value2 of list2) {
        screen2.drawLine(value2[0].x, value2[0].x, value2[1].x, value2[1].x, 7)
    }
})
scene.onHitWall(SpriteKind.Enemy, function on_hit_wall(sprite2: Sprite, location: tiles.Location) {
    if (tiles.tileIs(tiles.locationOfSprite(sprite2), assets.tile`
            derecha
            `)) {
        sprite2.vy = 0
        sprite2.vx = enemigo_velocidad
    } else if (tiles.tileIs(tiles.locationOfSprite(sprite2), assets.tile`
            abajo1
            `)) {
        sprite2.vy = enemigo_velocidad
        sprite2.vx = 0
    } else if (tiles.tileIs(tiles.locationOfSprite(sprite2), assets.tile`
            izquierda0
            `)) {
        sprite2.vy = 0
        sprite2.vx = 0 - enemigo_velocidad
    } else if (tiles.tileIs(tiles.locationOfSprite(sprite2), assets.tile`
            arriba0
            `)) {
        sprite2.vy = 0 - enemigo_velocidad
        sprite2.vx = 0
    } else if (tiles.tileIs(tiles.locationOfSprite(sprite2), assets.tile`
            doblesentido
            `)) {
        sprite2.vy = 0
        sprite2.vx = enemigo_velocidad
        if (Math.percentChance(50)) {
            sprite2.vx = 0 - enemigo_velocidad
        }
        
    } else if (tiles.tileIs(tiles.locationOfSprite(sprite2), assets.tile`
            miMosaico0
            `)) {
        sprites.destroy(sprite2)
        info.changeLifeBy(-1)
    } else {
        
    }
    
})
function hacer_rayo(fuente: Sprite, daño2: number, golpe: Sprite[]) {
    if (daño2 > 0) {
        golpe.push(fuente)
        daño_electrical(fuente, daño2)
        for (let value3 of spriteutils.getSpritesWithin(SpriteKind.Enemy, 16, fuente)) {
            if (golpe.indexOf(value3) == -1) {
                hacer_rayo(value3, daño2 / 2, golpe)
                list2.push([fuente, value3])
            }
            
        }
    }
    
}

sprites.onDestroyed(SpriteKind.Enemy, function on_on_destroyed(sprite3: Sprite) {
    
    swarm_left_to_destroy += -1
    if (swarm_left_to_spawn == 0 && swarm_left_to_destroy == 0) {
        info.startCountdown(10)
    }
    
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_on_overlap(sprite4: Sprite, otherSprite: Sprite) {
    sprites.destroy(sprite4)
    daño_electrical(otherSprite, 100)
})
let projectile : Sprite = null
let nuevo_enemigo : Sprite = null
let target : Sprite = null
let cosa_que_sujetamos : Sprite = null
let torre_nueva : Sprite = null
let swarm_left_to_destroy = 0
let swarm_left_to_spawn = 0
let list2 : Sprite[][] = []
let icono_electric : Sprite = null
let icono_arquero : Sprite = null
let cursor : Sprite = null
let arquero_radio = 0
let swarmTotal = 0
let enemigo_velocidad = 0
tiles.loadMap(tiles.createSmallMap(tilemap`
    map
    `))
enemigo_velocidad = 20
tiles.coverAllTiles(assets.tile`
        abajo1
        `, assets.tile`
        miMosaico
        `)
tiles.coverAllTiles(assets.tile`
        izquierda0
        `, assets.tile`
        miMosaico
        `)
tiles.coverAllTiles(assets.tile`
        arriba0
        `, assets.tile`
        miMosaico
        `)
tiles.coverAllTiles(assets.tile`
        derecha
        `, assets.tile`
        miMosaico
        `)
tiles.coverAllTiles(assets.tile`
        doblesentido
        `, assets.tile`
        miMosaico
        `)
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
icono_arquero.top = 2
icono_arquero.left = 110
icono_electric = sprites.create(img`
        . 7 7 7 7 7 7 .
        7 6 6 6 6 6 6 7
        7 6 7 7 7 7 6 7
        7 7 7 7 7 7 7 7
        7 6 2 1 1 2 6 7
        7 6 1 3 3 1 6 7
        7 6 6 6 6 6 6 7
        . 7 7 7 7 7 7 .
        `, SpriteKind.Icono)
icono_electric.top = 2
icono_electric.left = 130
info.setLife(20)
info.startCountdown(30)
info.setScore(80)
list2 = []
game.onUpdate(function on_on_update() {
    if (cosa_que_sujetamos) {
        cosa_que_sujetamos.setPosition(cursor.x, cursor.y)
    }
    
})
game.onUpdateInterval(2000, function on_update_interval() {
    
    for (let value4 of sprites.allOfKind(SpriteKind.torre)) {
        if (sprites.readDataString(value4, "nombre") == "electric" && value4 != cosa_que_sujetamos) {
            target = spriteutils.getSpritesWithin(SpriteKind.Enemy, arquero_radio, value4)._pickRandom()
            if (target) {
                hacer_rayo(target, 6, [])
            }
            
        }
        
    }
    timer.after(500, function on_after() {
        
        list2 = []
    })
})
game.onUpdateInterval(1000, function on_update_interval2() {
    
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
        tiles.placeOnRandomTile(nuevo_enemigo, assets.tile`
            myTile
            `)
        nuevo_enemigo.vy = enemigo_velocidad
        sprites.setDataNumber(nuevo_enemigo, "vida", 2)
    }
    
})
game.onUpdateInterval(500, function on_update_interval3() {
    
    for (let value5 of sprites.allOfKind(SpriteKind.torre)) {
        if (sprites.readDataString(value5, "nombre") == "arquero" && value5 != cosa_que_sujetamos) {
            target = spriteutils.getSpritesWithin(SpriteKind.Enemy, arquero_radio, value5)._pickRandom()
            if (target) {
                projectile = sprites.createProjectileFromSprite(img`
                    4 4
                    4 4
                    `, value5, 0, 0)
                spriteutils.setVelocityAtAngle(projectile, spriteutils.angleFrom(value5, target), 100)
                projectile.setFlag(SpriteFlag.GhostThroughWalls, true)
            }
            
        }
        
    }
})
game.onUpdateInterval(500, function on_update_interval4() {
    
    list2 = []
})
