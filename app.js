import BoardBuilder from "./js/BoardBuilder.js";
import { PLAYER_RED, PLAYER_BLUE, PLAYER_YELLOW, PLAYER_GREEN } from "./js/Player.js";
import View from "./js/View.js";

class GameManager {
	constructor(num_players) {
		let temp = BoardBuilder.StandardBoard();
		this.board = temp.board;
		this.turn_tile = temp.extra;
		this.num_players = num_players;
		this.players = [PLAYER_RED, PLAYER_BLUE, PLAYER_YELLOW, PLAYER_GREEN].slice(0, num_players);
		this.view = new View(this.board);
		this.start_game();
	}

	start_game() {
		this.turn_nr = 0;
		this.current_player = this.players[0];
		console.log("It is " + this.current_player.name + "'s turn");
		console.log(this.turn_tile);
		this.view.generate_view();
		this.view.render_state();
	}
}

let game_manager = new GameManager(4);
