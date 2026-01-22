tiles.loadMap(tiles.createSmallMap(tilemap`level3`))
game.onUpdate(function () {
    music.play(music.createSong(hex`00780004080200`), music.PlaybackMode.UntilDone)
})
