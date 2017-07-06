"use strict";
/**
 * Created by Pasha on 06-Jul-17.
 */

class ViewPort {
	constructor() {
		this.snake = new Snake();
		this.viewPort = document.createElementNS('http://www.w3.org/2000/svg','svg');
		this.viewPort.setAttribute('height', (ROWS*RECT_SIZE).toString());
		this.viewPort.setAttribute('width', (COLS*RECT_SIZE).toString());

// let row = document.createElementNS('http://www.w3.org/2000/svg','g');
// let coll = document.createElementNS('http://www.w3.org/2000/svg','g');

		this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.rect.setAttribute('width', RECT_SIZE);
		this.rect.setAttribute('height', RECT_SIZE);


// We have a ROWS x COLS matrix filled by `rect` elements
		this.rectMatrix = [];
		// console.log(this.rectMatrix);
		let x, y, row, col;


			// row = document.createElementNS('http://www.w3.org/2000/svg','svg');
		for (y=0; y<ROWS; y++) {
			this.rectMatrix[y] = [];
				for (x=0; x<COLS; x++) {
				col = document.createElementNS('http://www.w3.org/2000/svg','svg');
				col.setAttribute('x', (x*RECT_SIZE).toString());
				col.setAttribute('y', (y*RECT_SIZE).toString());
				this.rectMatrix[y][x] = this.rect.cloneNode(false);
				this.rectMatrix[y][x].setAttribute('id', `tile-x-${x}-y-${y}`);
				this.rectMatrix[y][x].setAttribute('style', `fill:rgb(255,255,255);stroke-width:1;stroke:rgb(0,0,0)`);
				// this.rect.setAttribute('style', `fill:rgb(${this.snake.check(x, y) ? '0, 0, 0' : '255,255,255'});stroke-width:1;stroke:rgb(0,0,0)`);

				col.appendChild(this.rectMatrix[y][x]);
				// console.log(x, y, this.rectMatrix[x][y]);
				this.viewPort.appendChild(col);
			}
		}


// console.log(rectMatrix);


		return this.tick();
	}

	tick() {
		this.snake.tick();
		if (this.snake.collection[2].x === COLS -1 || this.snake.collection[2].y === ROWS) {
			console.log('loose');
			return;
		}
		setTimeout(()=>{
			this.tick();
			this.render();
		}, 300);
	}

	render() {
		this.snake.collection.map(item=>{
			this.rectMatrix[item.y][item.x].setAttribute('style', `fill:rgb(0,0,0);stroke-width:1;stroke:rgb(0,0,0)`);
		});

		return this.viewPort
	}

}