"use strict";
/**
 * Created by Pasha on 06-Jul-17.
 */

class ViewPort {
	static generateFoodCoordinates(snakeCollection, totalRows, totalCols) {
		const _getCoordinates = ()=>{
			return {
				y:Math.floor(Math.random() * (totalRows)),
				x:Math.floor(Math.random() * (totalCols))
			}
		};
		let _r =_getCoordinates();
		const _check = (x, y) => {
			return snakeCollection.reduce((acc, item)=> {
				return acc || (item.x === x && item.y === y)
			}, false)
		};

		while (_check(_r.x, _r.y)) {
			_r = _getCoordinates();
		}
		return _r;
	}

	static tickSpeed(speed, eatenCount) {
		return speed * 1/Math.pow(eatenCount, 0.2);
	}

	constructor(options) {
		this.options = {
			ROWS:options.ROWS || 50,
			COLS:options.COLS || 50,
			RECT_SIZE:options.RECT_SIZE || 12,
			SPEED:options.SPEED || 100,  // miliseconds
			INPUT_KEYS:options.INPUT_KEYS || {
				'37':'LEFT',
				'39':'RIGHT',
				'40':'BOTTOM',
				'38':'TOP'
			}
		};
		this.snake = new Snake();

		document.addEventListener("keydown", (e)=>{this.handleKeyPress(e, this.snake)});

		this.viewPort = document.createElementNS('http://www.w3.org/2000/svg','svg');
		this.viewPort.setAttribute('height', (this.options.ROWS*this.options.RECT_SIZE).toString());
		this.viewPort.setAttribute('width', (this.options.COLS*this.options.RECT_SIZE).toString());
		this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.rect.setAttribute('width', this.options.RECT_SIZE);
		this.rect.setAttribute('height', this.options.RECT_SIZE);

		this.food = this.constructor.generateFoodCoordinates(this.snake.collection, this.options.ROWS, this.options.COLS);
		// We should have a ROWS x COLS matrix
		this.rectMatrix = [];
		let x, y, rectWrapper;
		for (y=0; y<this.options.ROWS; y++) {
			this.rectMatrix[y] = [];
			for (x=0; x<this.options.COLS; x++) {
				rectWrapper = document.createElementNS('http://www.w3.org/2000/svg','svg');
				rectWrapper.setAttribute('x', (x*this.options.RECT_SIZE).toString());
				rectWrapper.setAttribute('y', (y*this.options.RECT_SIZE).toString());
				this.rectMatrix[y][x] = this.rect.cloneNode(false);
				this.rectMatrix[y][x].setAttribute('id', `tile-x-${x}-y-${y}`);
				this.rectMatrix[y][x].setAttribute('style', `fill:rgb(255,255,255);stroke-width:1;stroke:rgb(0,0,0)`);
				rectWrapper.appendChild(this.rectMatrix[y][x]);
				this.viewPort.appendChild(rectWrapper);
			}
		}
		this.score = document.querySelector("#score");
		// this.scoreBox.appendChild('s');
		return this.tick();
	}

	tick() {
		setTimeout(()=>{
			let head = this.snake.collection[this.snake.collection.length-1];
			let isWallCollisionOccurred = head.x === this.options.COLS - 1 || head.y === this.options.ROWS - 1 || head.x < 0 || head.y < 0;
			let isSelfCollisionOccurred = this.snake.checkSelfCollision();
			if (isWallCollisionOccurred || isSelfCollisionOccurred) {
				console.log('loose');
				return;
			}
			this.tick();
			this.snake.tick(this.food);
			this.render();
		}, this.constructor.tickSpeed(this.options.SPEED, (this.snake.eatenCount || 0.75)));
	}

	handleKeyPress(event, snake) {
		if (this.options.INPUT_KEYS[event.keyCode]) {
			this.snake.handleChange(this.options.INPUT_KEYS[event.keyCode], snake);
		}
	}

	render() {
		if (this.snake.removed) {
			this.rectMatrix[this.snake.removed.y][this.snake.removed.x].setAttribute('style', `fill:rgb(255,255,255);stroke-width:1;stroke:rgb(0,0,0)`);;
		}

		if (this.snake.eaten) {
			this.food = this.constructor.generateFoodCoordinates(this.snake.collection, this.options.ROWS, this.options.COLS);
		}
		this.rectMatrix[this.food.y][this.food.x].setAttribute('style', `fill:rgb(0,0,0);stroke-width:1;stroke:rgb(0,0,0)`);
		this.snake.collection.map(item=>{
			if (this.rectMatrix[item.y] && this.rectMatrix[item.y][item.x]) {
				this.rectMatrix[item.y][item.x].setAttribute('style', `fill:rgb(0,0,0);stroke-width:1;stroke:rgb(0,0,0)`);
			}
		});
		// console.log(this.score);
		// console.log(this.snake.eatenCount);
		this.score.innerHTML = this.snake.eatenCount;
		return this.viewPort
	}

}