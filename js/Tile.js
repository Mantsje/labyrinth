
export default class Tile {

    // boolean parameters stating whether you can go that way
    constructor(north, east, south, west) {
        this._dirs = [north, east, south, west]
       	this.rotation = 0
    }

	rotate_clockwise(steps=1) {
		this.rotation = (this.rotation + steps) % 4
	}

	rotate_counter_clockwise(steps=1) {
		this.rotation = (this.rotation - steps) % 4
	}

	// Which way is currently facing in said direction?
	get north() { return this._dirs[(0 + this.rotation) % 4] }
	get east() { return this._dirs[(1 + this.rotation) % 4] }
	get south() { return this._dirs[(2 + this.rotation) % 4] }
	get west() { return this._dirs[(3 + this.rotation) % 4] }

	static Corner() { return  new Tile(true, true, false, false) }
	static T_Split() { return  new Tile(true, true, false, true) }
	static Straight() { return  new Tile(false, true, false, true) }	
}

export class TreasureTile extends Tile {
	
	constructor(north, east, south, west, treasure) {
		super(north, east, south, west)
		this.treasure = treasure
	}
	
	static Corner(treasure) { return  new Tile(true, true, false, false, treasure) }
	static T_Split(treasure) { return  new Tile(true, true, false, true, treasure) }
	static Straight(treasure) { return  new Tile(false, true, false, true, treasure) }
}

export class HomeTile extends Tile {
	
	constructor(north, east, south, west, player) {
		super(north, east, south, west)
		this.player = player
	}
	
	static Corner(player) { return  new HomeTile(true, true, false, false, player) }
	static T_Split(player) { return  new HomeTile(true, true, false, true, player) }
	static Straight(player) { return  new HomeTile(false, true, false, true, player) }
}
