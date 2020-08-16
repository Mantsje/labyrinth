import Tile, { TreasureTile, HomeTile } from "./Tile.js";
import { PLAYER_RED, PLAYER_BLUE, PLAYER_GREEN, PLAYER_YELLOW } from "./Player.js";
import Board from "./Board.js";

const TILE_GOLD = TreasureTile.T_Split({ name: "Bag of Gold" });
const TILE_BOOK = TreasureTile.T_Split({ name: "Book" });
const TILE_SWORD = TreasureTile.T_Split({ name: "Sword" });
const TILE_CANDLEHOLDER = TreasureTile.T_Split({ name: "Candlestick Holder" });
const TILE_MAP = TreasureTile.T_Split({ name: "Map" });
const TILE_CHEST = TreasureTile.T_Split({ name: "Treasure Chest" });
const TILE_RING = TreasureTile.T_Split({ name: "Ring" });
const TILE_KEYS = TreasureTile.T_Split({ name: "Keychain" });
const TILE_SKULL = TreasureTile.T_Split({ name: "Skull" });
const TILE_CROWN = TreasureTile.T_Split({ name: "Crown" });
const TILE_JEWEL = TreasureTile.T_Split({ name: "Jewel" });
const TILE_HELMET = TreasureTile.T_Split({ name: "Helmet" });

const TILE_PIGLET = TreasureTile.T_Split({ name: "Piglet Lady" });
const TILE_GHOST1 = TreasureTile.T_Split({ name: "Ghost#1" });
const TILE_GHOST2 = TreasureTile.T_Split({ name: "Ghost#2" });
const TILE_FAIRY = TreasureTile.T_Split({ name: "Fairy" });
const TILE_DRAGON = TreasureTile.T_Split({ name: "Dragon" });
const TILE_BAT = TreasureTile.T_Split({ name: "Bat" });

const TILE_MOTH = TreasureTile.Corner({ name: "Moth" });
const TILE_MOUSE = TreasureTile.Corner({ name: "Mouse" });
const TILE_SCARAB = TreasureTile.Corner({ name: "Scarab" });
const TILE_LIZARD = TreasureTile.Corner({ name: "Lizard" });
const TILE_OWL = TreasureTile.Corner({ name: "Owl" });
const TILE_SPIDER = TreasureTile.Corner({ name: "Spider" });

const TILE_HOME_RED = HomeTile.Corner(PLAYER_RED);
const TILE_HOME_BLUE = HomeTile.Corner(PLAYER_BLUE);
const TILE_HOME_GREEN = HomeTile.Corner(PLAYER_GREEN);
const TILE_HOME_YELLOW = HomeTile.Corner(PLAYER_YELLOW);

export default class BoardBuilder {
	static _shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

			// swap elements array[i] and array[j]
			// we use "destructuring assignment" syntax to achieve that
			// you'll find more details about that syntax in later chapters
			// same can be written as:
			// let t = array[i]; array[i] = array[j]; array[j] = t
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	static _clone(obj) {
		return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
	}

	// blue _ helmet _ candleholder _ green
	// _ _ _ _ _ _ _
	// sword _ jewel _ treasure chest _ ring
	// _ _ _ _ _ _ _
	// skull _ keys _ crown _ map
	// _ _ _ _ _ _ _
	// yellow _ gold _ book _ red
	static StandardBoard() {
		let num_straight = 13;
		let num_corner = 9;
		let board_dims = [7, 7];
		let board_tiles = [...Array(board_dims[0])].map(() => [...Array(board_dims[1])]);
		let moveable_mask = [...Array(board_dims[0])].map(() => [...Array(board_dims[1])]);

		let immovables = [
			TILE_HOME_BLUE,
			TILE_HELMET,
			TILE_CANDLEHOLDER,
			TILE_HOME_GREEN,
			TILE_SWORD,
			TILE_JEWEL,
			TILE_CHEST,
			TILE_RING,
			TILE_SKULL,
			TILE_KEYS,
			TILE_CROWN,
			TILE_MAP,
			TILE_HOME_YELLOW,
			TILE_GOLD,
			TILE_BOOK,
			TILE_HOME_RED
		];
		// Properly align the tiles to the board
		let rotations = [1, 2, 2, 2, 1, 1, 2, 3, 1, 0, 3, 3, 0, 0, 0, 3];
		immovables = immovables.map((x) => this._clone(x)); // deep_copy
		for (let i = 0; i < immovables.length; i++) immovables[i].rotate_clockwise(rotations[i]);

		// Left over tiles in a random order
		let random_tiles = [];
		for (let i = 0; i < num_straight; i++) random_tiles.push(Tile.Straight());
		for (let i = 0; i < num_corner; i++) random_tiles.push(Tile.Corner());
		let random_treasures = [
			TILE_PIGLET,
			TILE_GHOST1,
			TILE_GHOST2,
			TILE_FAIRY,
			TILE_DRAGON,
			TILE_BAT,
			TILE_MOTH,
			TILE_MOUSE,
			TILE_SCARAB,
			TILE_LIZARD,
			TILE_OWL,
			TILE_SPIDER
		];
		random_treasures = random_treasures.map((x) => this._clone(x)); // deep_copy
		random_tiles = random_tiles.concat(random_treasures);
		this._shuffle(random_tiles);

		// Set up the moveable mask and other tiles
		for (let i = 0; i < board_dims[0]; i++) {
			for (let j = 0; j < board_dims[1]; j++) {
				if (i % 2 === 0 && j % 2 === 0) {
					moveable_mask[i][j] = false;
					board_tiles[i][j] = immovables.shift();
				} else {
					moveable_mask[i][j] = true;
					let rot = Math.floor(Math.random() * 4);
					let t = random_tiles.shift();
					t.rotate_clockwise(rot);
					board_tiles[i][j] = t;
				}
			}
		}

		return { board: new Board(board_tiles, moveable_mask), extra: random_tiles[0] };
	}
}
