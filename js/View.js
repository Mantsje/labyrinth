export default class View {
	constructor(board) {
		this.board = board;
		this.container = document.querySelector(".board-box");
	}

	generate_view() {
		let container = document.querySelector(".board-box");
		let rows = this.board.tiles.length;
		let cols = this.board.tiles[0].length;
		for (let i = 0; i < rows; i++) {
			container.innerHTML += `<div id="tile_row${i}" class="board-row">`;
			let row = container.querySelectorAll(".board-row")[i];
			for (let j = 0; j < cols; j++) {
				row.innerHTML +=
					`<div 
                id="tile_${i * rows + j}" 
                class="tile-box ${!this.board.moveables[i][j] ? "immovable" : ""}">
                <span>` +
					(i * rows + j) +
					`</span>
                </div>`;
			}
			container.innerHTML += "</div>";
		}
		this._add_allowed_arrows();
	}

	_add_allowed_arrows() {
		this._add_horizontal_arrows();
		this._add_vertical_arrows();
	}

	_add_horizontal_arrows() {
		let rows = this.board.tiles.length;
		let cols = this.board.tiles[0].length;
		for (let i = 0; i < cols; i++) {
			let row_up = this.container.querySelectorAll(".board-row")[0];
			let row_low = this.container.querySelectorAll(".board-row")[rows - 1];
			let span = row_low.querySelectorAll("span")[i];

			let rect_low = row_low.getBoundingClientRect();
			let rect_span = span.getBoundingClientRect();
			let offset_left = rect_low.right - rect_span.left;
			let offset_top = rect_low.bottom - rect_low.top - 5;
			if (!this.board.immoveableColumns.has(i)) {
				row_up.innerHTML += `<div style="right:${offset_left}px; bottom:${30}px;" class="fas-container"><i class="fas fa-caret-down"></i></div>`;
				row_low.innerHTML += `<div style="right:${offset_left}px; top:${offset_top}px;" class="fas-container"><i class="fas fa-caret-up"></i></div>`;
			}
		}
	}

	_add_vertical_arrows() {
		let rows = this.board.tiles.length;
		for (let i = 0; i < rows; i++) {
			let row = this.container.querySelectorAll(".board-row")[i];
			let rect = row.getBoundingClientRect();

			let offset_top = (rect.bottom - rect.top) / 2 - 20; // magic offset relative to font size
			if (!this.board.immoveableRows.has(i)) {
				row.innerHTML =
					`<div style="left:${-20}px; top:${offset_top}px;" class="fas-container"><i class="fas fa-caret-right"></i></div>` +
					row.innerHTML;
				row.innerHTML += `<div style="left:${5}px; top:${offset_top}px;" class="fas-container"><i class="fas fa-caret-left"></i></div>`;
			}
		}
	}

	render_state() {
		let rows = this.board.tiles.length;
		let cols = this.board.tiles[0].length;
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				console.log(this.board.tiles[row][col]);
			}
		}
	}
}
