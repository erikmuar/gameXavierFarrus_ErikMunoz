// Código generado automáticamente. No editar.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level2":
            case "level2":return tiles.createTilemap(hex`1000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16], TileScale.Sixteen);
            case "map":
            case "level3":return tiles.createTilemap(hex`14000f00000100000000000000000000000000000000000000020000000000000000000000000000000000000002000000000000000000000000000000000000000200000000020202020202020202000000000000020000000002000000000000000200000000000002000000000200000000000000020000000000000200000000020000000000020202020200000000020000000002000000000002000000020000000002000000000200000000000200000002000000000200000000020000000000020202020200000000020000000002000000000000000200000000000002000000000200000000000000020000000000000202020202020000000000000002000000000000000000000000000000000000000202020202030000000000000000000000000000000000000000`, img`
2 . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 . 2 2 2 2 . . . . . . . . . 2 2 2 2 2 
2 . 2 2 2 2 . 2 2 2 2 2 2 2 . 2 2 2 2 2 
2 . 2 2 2 2 . 2 2 2 2 2 2 2 . 2 2 2 2 2 
2 . 2 2 2 2 . 2 2 2 2 2 . . . . . 2 2 2 
2 . 2 2 2 2 . 2 2 2 2 2 . 2 2 2 . 2 2 2 
2 . 2 2 2 2 . 2 2 2 2 2 . 2 2 2 . 2 2 2 
2 . 2 2 2 2 . 2 2 2 2 2 . . . . . 2 2 2 
2 . 2 2 2 2 . 2 2 2 2 2 2 2 . 2 2 2 2 2 
2 . 2 2 2 2 . 2 2 2 2 2 2 2 . 2 2 2 2 2 
2 . . . . . . 2 2 2 2 2 2 2 . 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . . . . 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency8,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile4,myTiles.tile6,myTiles.tile7,myTiles.tile8,myTiles.tile9], TileScale.Eight);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "transparency8":return transparency8;
            case "miMosaico":
            case "tile2":return tile2;
            case "myTile":
            case "tile1":return tile1;
            case "miMosaico0":
            case "tile3":return tile3;
            case "abajo1":
            case "tile4":return tile4;
            case "arriba0":
            case "tile6":return tile6;
            case "izquierda0":
            case "tile7":return tile7;
            case "derecha":
            case "tile8":return tile8;
            case "doblesentido":
            case "tile9":return tile9;
        }
        return null;
    })

}
// Código generado automáticamente. No editar.
