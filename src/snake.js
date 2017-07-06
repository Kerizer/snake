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
			{x:3, y:0}
		];
		this.tick();
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
		collection.splice(0, 1);
		this.collection = [...collection, {x:this.collection[this.collection.length-1].x+1, y:0}];
		// this.collection.map(item=>{
		//
		// 	// this.rect.setAttribute('style', `fill:rgb(${this.snake.check(x, y) ? '0, 0, 0' : '255,255,255'});stroke-width:1;stroke:rgb(0,0,0)`);
		// })

	}

	changeDirection(direction) {

	}
}