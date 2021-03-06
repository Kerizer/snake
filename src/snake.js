"use strict";
/**
 * Created by Pasha on 06-Jul-17.
 */

class Snake {
	constructor() {
		this.direction = 'RIGHT';
		this.nextDirection = 'RIGHT';
		this.eaten = false;
		this.collection = [
			{x:1, y:0},
			{x:2, y:0},
			{x:3, y:0},
			{x:4, y:0},
			{x:5, y:0},
			{x:6, y:0}
		];
		this.removed = null;
		this.eatenCount = 0;
	}

	check(x, y) {
		// next line doesn't work because two object`s are always non-equal =(
		// return !!~this.collection.indexOf({x,y});

		// as soon as acc will become true it will always return true
		// it will become true as soon, as the first coincidence
		// will be detected BUT it won`t exit from the method, so:
		// TODO: rewrite it using 'for' can be a good idea
		return this.collection.reduce((acc, item)=>(acc || item.x === x && item.y === y), false);
	}

	nextRectCoordinates() {
		let head = this.collection[this.collection.length-1];
		return {
			x:head.x + (this.direction === 'RIGHT' ? 1 : this.direction === 'LEFT' ? -1 : 0),
			y:head.y + (this.direction === 'BOTTOM' ? 1 : this.direction === 'TOP' ? -1 : 0)
		};
	}

	checkSelfCollision() {
		let nextRectCoordinates = this.nextRectCoordinates();
		return this.check(nextRectCoordinates.x, nextRectCoordinates.y);
	}

	tick(foodCoordinates) {
		let collection = [...this.collection];
		this.direction = this.nextDirection || this.direction;
		this.removed = collection[0];
		collection.splice(0, 1);
		this.eaten = false;

		this.collection = [...collection, this.nextRectCoordinates()];

		if (this.check(foodCoordinates.x, foodCoordinates.y)) {
			this.eaten = true;
			this.eatenCount++;
			this.collection.unshift({
				x:foodCoordinates.x,
				y:foodCoordinates.y
			});
		}
	}

	handleChange(direction) {
		const invalidDirections = [
			direction === 'BOTTOM' && this.direction === 'TOP',
			direction === 'TOP' && this.direction === 'BOTTOM',
			direction === 'RIGHT' && this.direction === 'LEFT',
			direction === 'LEFT' && this.direction === 'RIGHT'
		];
		if (~invalidDirections.indexOf(true)) {
			return null;
		}
		this.nextDirection = direction;
	}
}