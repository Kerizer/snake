"use strict";
/**
 * Created by Pasha on 06-Jul-17.
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewPort = function () {
	_createClass(ViewPort, null, [{
		key: 'generateFoodCoordinates',
		value: function generateFoodCoordinates(snakeCollection, totalRows, totalCols) {
			var _getCoordinates = function _getCoordinates() {
				return {
					y: Math.floor(Math.random() * totalRows),
					x: Math.floor(Math.random() * totalCols)
				};
			};
			var _r = _getCoordinates();
			var _check = function _check(x, y) {
				return snakeCollection.reduce(function (acc, item) {
					return acc || item.x === x && item.y === y;
				}, false);
			};

			while (_check(_r.x, _r.y)) {
				_r = _getCoordinates();
			}
			return _r;
		}
	}, {
		key: 'tickSpeed',
		value: function tickSpeed(speed, eatenCount) {
			return speed * 1 / Math.pow(eatenCount, 0.2);
		}
	}]);

	function ViewPort(options) {
		var _this = this;

		_classCallCheck(this, ViewPort);

		this.options = {
			ROWS: options.ROWS || 50,
			COLS: options.COLS || 50,
			RECT_SIZE: options.RECT_SIZE || 12,
			SPEED: options.SPEED || 100, // miliseconds
			INPUT_KEYS: options.INPUT_KEYS || {
				'37': 'LEFT',
				'39': 'RIGHT',
				'40': 'BOTTOM',
				'38': 'TOP'
			}
		};
		this.snake = new Snake();

		document.addEventListener("keydown", function (e) {
			_this.handleKeyPress(e, _this.snake);
		});

		this.viewPort = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		this.viewPort.setAttribute('height', (this.options.ROWS * this.options.RECT_SIZE).toString());
		this.viewPort.setAttribute('width', (this.options.COLS * this.options.RECT_SIZE).toString());
		this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.rect.setAttribute('width', this.options.RECT_SIZE);
		this.rect.setAttribute('height', this.options.RECT_SIZE);

		this.food = this.constructor.generateFoodCoordinates(this.snake.collection, this.options.ROWS, this.options.COLS);
		// We should have a ROWS x COLS matrix
		this.rectMatrix = [];
		var x = void 0,
		    y = void 0,
		    rectWrapper = void 0;
		for (y = 0; y < this.options.ROWS; y++) {
			this.rectMatrix[y] = [];
			for (x = 0; x < this.options.COLS; x++) {
				rectWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
				rectWrapper.setAttribute('x', (x * this.options.RECT_SIZE).toString());
				rectWrapper.setAttribute('y', (y * this.options.RECT_SIZE).toString());
				this.rectMatrix[y][x] = this.rect.cloneNode(false);
				this.rectMatrix[y][x].setAttribute('id', 'tile-x-' + x + '-y-' + y);
				this.rectMatrix[y][x].setAttribute('style', 'fill:rgb(255,255,255);stroke-width:1;stroke:rgb(0,0,0)');
				rectWrapper.appendChild(this.rectMatrix[y][x]);
				this.viewPort.appendChild(rectWrapper);
			}
		}
		this.score = document.querySelector("#score");
		// this.scoreBox.appendChild('s');
		return this.tick();
	}

	_createClass(ViewPort, [{
		key: 'tick',
		value: function tick() {
			var _this2 = this;

			setTimeout(function () {
				var head = _this2.snake.collection[_this2.snake.collection.length - 1];
				var isWallCollisionOccurred = head.x === _this2.options.COLS - 1 || head.y === _this2.options.ROWS - 1 || head.x < 0 || head.y < 0;
				var isSelfCollisionOccurred = _this2.snake.checkSelfCollision();
				if (isWallCollisionOccurred || isSelfCollisionOccurred) {
					console.log('loose');
					return;
				}
				_this2.tick();
				_this2.snake.tick(_this2.food);
				_this2.render();
			}, this.constructor.tickSpeed(this.options.SPEED, this.snake.eatenCount || 0.75));
		}
	}, {
		key: 'handleKeyPress',
		value: function handleKeyPress(event, snake) {
			if (this.options.INPUT_KEYS[event.keyCode]) {
				this.snake.handleChange(this.options.INPUT_KEYS[event.keyCode], snake);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			if (this.snake.removed) {
				this.rectMatrix[this.snake.removed.y][this.snake.removed.x].setAttribute('style', 'fill:rgb(255,255,255);stroke-width:1;stroke:rgb(0,0,0)');;
			}

			if (this.snake.eaten) {
				this.food = this.constructor.generateFoodCoordinates(this.snake.collection, this.options.ROWS, this.options.COLS);
			}
			this.rectMatrix[this.food.y][this.food.x].setAttribute('style', 'fill:rgb(0,0,0);stroke-width:1;stroke:rgb(0,0,0)');
			this.snake.collection.map(function (item) {
				if (_this3.rectMatrix[item.y] && _this3.rectMatrix[item.y][item.x]) {
					_this3.rectMatrix[item.y][item.x].setAttribute('style', 'fill:rgb(0,0,0);stroke-width:1;stroke:rgb(0,0,0)');
				}
			});
			// console.log(this.score);
			// console.log(this.snake.eatenCount);
			this.score.innerHTML = this.snake.eatenCount;
			return this.viewPort;
		}
	}]);

	return ViewPort;
}();