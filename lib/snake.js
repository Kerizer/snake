"use strict";
/**
 * Created by Pasha on 06-Jul-17.
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Snake = function () {
	function Snake() {
		_classCallCheck(this, Snake);

		this.direction = 'RIGHT';
		this.nextDirection = 'RIGHT';
		this.eaten = false;
		this.collection = [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }];
		this.removed = null;
		this.eatenCount = 0;
	}

	_createClass(Snake, [{
		key: 'check',
		value: function check(x, y) {
			// next line doesn't work because two object`s are always non-equal =(
			// return !!~this.collection.indexOf({x,y});

			// as soon as acc will become true it will always return true
			// it will become true as soon, as the first coincidence
			// will be detected BUT it won`t exit from the method, so:
			// TODO: rewrite it using 'for' can be a good idea
			return this.collection.reduce(function (acc, item) {
				return acc || item.x === x && item.y === y;
			}, false);
		}
	}, {
		key: 'nextRectCoordinates',
		value: function nextRectCoordinates() {
			var head = this.collection[this.collection.length - 1];
			return {
				x: head.x + (this.direction === 'RIGHT' ? 1 : this.direction === 'LEFT' ? -1 : 0),
				y: head.y + (this.direction === 'BOTTOM' ? 1 : this.direction === 'TOP' ? -1 : 0)
			};
		}
	}, {
		key: 'checkSelfCollision',
		value: function checkSelfCollision() {
			var nextRectCoordinates = this.nextRectCoordinates();
			return this.check(nextRectCoordinates.x, nextRectCoordinates.y);
		}
	}, {
		key: 'tick',
		value: function tick(foodCoordinates) {
			var collection = [].concat(_toConsumableArray(this.collection));
			this.direction = this.nextDirection || this.direction;
			this.removed = collection[0];
			collection.splice(0, 1);
			this.eaten = false;

			this.collection = [].concat(_toConsumableArray(collection), [this.nextRectCoordinates()]);

			if (this.check(foodCoordinates.x, foodCoordinates.y)) {
				this.eaten = true;
				this.eatenCount++;
				this.collection.unshift({
					x: foodCoordinates.x,
					y: foodCoordinates.y
				});
			}
		}
	}, {
		key: 'handleChange',
		value: function handleChange(direction) {
			var invalidDirections = [direction === 'BOTTOM' && this.direction === 'TOP', direction === 'TOP' && this.direction === 'BOTTOM', direction === 'RIGHT' && this.direction === 'LEFT', direction === 'LEFT' && this.direction === 'RIGHT'];
			if (~invalidDirections.indexOf(true)) {
				return null;
			}
			this.nextDirection = direction;
		}
	}]);

	return Snake;
}();