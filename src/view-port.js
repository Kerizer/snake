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
		this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.rect.setAttribute('width', RECT_SIZE);
		this.rect.setAttribute('height', RECT_SIZE);


		// We should have a ROWS x COLS matrix
		this.rectMatrix = [];
		let x, y, rectWrapper;
		for (y=0; y<ROWS; y++) {
			this.rectMatrix[y] = [];
				for (x=0; x<COLS; x++) {
				rectWrapper = document.createElementNS('http://www.w3.org/2000/svg','svg');
				rectWrapper.setAttribute('x', (x*RECT_SIZE).toString());
				rectWrapper.setAttribute('y', (y*RECT_SIZE).toString());
				this.rectMatrix[y][x] = this.rect.cloneNode(false);
				this.rectMatrix[y][x].setAttribute('id', `tile-x-${x}-y-${y}`);
				this.rectMatrix[y][x].setAttribute('style', `fill:rgb(255,255,255);stroke-width:1;stroke:rgb(0,0,0)`);
				rectWrapper.appendChild(this.rectMatrix[y][x]);
				this.viewPort.appendChild(rectWrapper);
			}
		}
		return this.tick();
	}

	tick() {
		setTimeout(()=>{
			let head = this.snake.collection[this.snake.collection.length-1];
			if (head.x === COLS - 1 || head.y === ROWS - 1 || head.x < 0 || head.y < 0) {
				console.log('loose');
				return;
			}
			this.tick();
			this.snake.tick();
			this.render();
		}, 300);
	}

	render() {
		if (this.snake.removed) {
			this.rectMatrix[this.snake.removed.y][this.snake.removed.x].setAttribute('style', `fill:rgb(255,255,255);stroke-width:1;stroke:rgb(0,0,0)`);;
		}
		this.snake.collection.map(item=>{
			this.rectMatrix[item.y][item.x].setAttribute('style', `fill:rgb(0,0,0);stroke-width:1;stroke:rgb(0,0,0)`);
		});

		return this.viewPort
	}

}