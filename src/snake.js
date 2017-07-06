"use strict";
/**
 * Created by Pasha on 06-Jul-17.
 */

class Snake {
	constructor() {
		this.direction = 'RIGHT';
		this.collection = [
			{x:1, y:0},
			{x:2, y:0},
			{x:3, y:0},
			{x:4, y:0},
			{x:5, y:0},
			{x:6, y:0}
		];
		this.removed = null;
	}

	check(x, y) {
		// next line doesn't work because two object`s are always non-equal =(
		// return !!~this.collection.indexOf({x,y});

		// as soon as acc will become true it will always return true
		// it will become true as soon, as the first coincidence will be detected BUT it won`t exit from the method, so:
		// TODO: rewrite it using 'for' can be a good idea
		return this.collection.reduce((acc, item)=>(acc || item.x === x && item.y === y), false);
	}

	tick() {
		let collection = [...this.collection];
		this.removed = collection[0];
		collection.splice(0, 1);
		let newSquare = {
			x:this.collection[this.collection.length-1].x + (this.direction === 'RIGHT' ? 1 : this.direction === 'LEFT' ? -1 : 0),
			y:this.collection[this.collection.length-1].y + (this.direction === 'BOTTOM' ? 1 : this.direction === 'TOP' ? -1 : 0)
		};
		this.collection = [...collection, newSquare];

	}

	changeDirection(direction) {

	}
}