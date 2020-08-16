
export const ROW_TYPE = 'row'
export const COLUMN_TYPE = 'column'
export const LEFT_OR_UP = -1
export const RIGHT_OR_DOWN = 1

export default class Board {
    
    constructor(tiles, moveable_mask) {
        // Both these are expected to be [row, row, row, row, etc]
        this.tiles = tiles
        this.moveables = moveable_mask
        
        this.immoveableRows = new Set()
        this.immoveableColumns = new Set()
        for (let i = 0; i < this.moveables.length; i++) {
            for (let j = 0; j < this.moveables[0].length; j++) {
                if (!this.moveables[i][j]) {
                    this.immoveableRows.add(i);
                    this.immoveableColumns.add(j);
                }
            }
        }
    }

    allowedInsert(number, type) {
        if (type === COLUMN_TYPE) {
            return this.immoveableColumns.has(number)
        } else if (type === COLUMN_TYPE) {
            return this.immoveableRows.has(number)
        } else {
            console.error("neither row nor column given. Don't now where to look!")
        }

    }

    // Returns the pushed out tile
    insertInRow(rowNumber, direction, tile) {
        if (allowedInsert(rowNumber, ROW_TYPE)) {
            return this._insertIn(rowNumber, direction, ROW_TYPE, tile) 
        }
        return null
    }
    
    // Returns the pushed out tile
    insertInColumn(colNumber, direction, tile) {
        if (allowedInsert(colNumber, COLUMN_TYPE)) {
            return this._insertIn(colNumber, direction, COLUMN_TYPE, tile)
        }
        return null
    }

    // Returns the pushed out tile
    _insertIn(number, direction, type, tile) {
        if (type === ROW_TYPE) {
            if (direction === RIGHT_OR_DOWN) {
                this.tiles[number].unshift(tile)
                return this.tiles[number].pop()
            } else if (direction === LEFT_OR_UP) {
                this.tiles[number].push(tile)
                return this.tiles[number].shift()
            } else console.error("No proper direction specified!")
        } else if (type === COLUMN_TYPE) {
            if (direction === RIGHT_OR_DOWN) {
                for (let row = 0; row < this.board.length; row++) {
                    let temp_tile = this.tiles[row][number]
                    this.tiles[row][number] = tile
                    tile = temp_tile
                }
                return tile
            } else if (direction === LEFT_OR_UP) {
                for (let row = this.board.length-1; row >= 0; row--) {
                    let temp_tile = this.tiles[row][number]
                    this.tiles[row][number] = tile
                    tile = temp_tile
                }
                return tile
            } else console.error("No proper direction specified!")

        } else {
            console.error("neither row nor column given. Don't now where to insert!")
        }
    }


}