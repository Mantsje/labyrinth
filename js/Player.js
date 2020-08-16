
const rgb = (r, g, b) => 
    `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`

class Player {
    constructor(name, color) {
        this.name = name
        this.color = color
    }
}

export const PLAYER_RED = new Player("Red Player", rgb(256, 0, 0))
export const PLAYER_BLUE = new Player("Blue Player", rgb(0, 0, 256))
export const PLAYER_GREEN = new Player("Green Player", rgb(0, 256, 0))
export const PLAYER_YELLOW = new Player("Yellow Player", rgb(256, 256, 0))