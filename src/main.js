"use strict";
/**
 * Created by Pasha on 06-Jul-17.
 */

let snake = new Snake();
let root = document.querySelector('#root');

let viewPort = document.createElementNS('http://www.w3.org/2000/svg','svg');
viewPort.setAttribute('height', (COLS*RECT_SIZE).toString());
viewPort.setAttribute('width', (ROWS*RECT_SIZE).toString());

// let row = document.createElementNS('http://www.w3.org/2000/svg','g');
// let coll = document.createElementNS('http://www.w3.org/2000/svg','g');

let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
rect.setAttribute('width', RECT_SIZE);
rect.setAttribute('height', RECT_SIZE);


// We have a ROWS x COLS matrix filled by `rect` elements
// let rectMatrix = new Array(COLS).fill(new Array(ROWS).fill(rect.cloneNode(false)));



// console.log(rectMatrix);
let x, y, row, col;
for (x=0; x<ROWS; x++) {
	row = document.createElementNS('http://www.w3.org/2000/svg','svg');
	for (y=0; y<ROWS; y++) {
		col = document.createElementNS('http://www.w3.org/2000/svg','svg');
		col.setAttribute('x', (x*RECT_SIZE).toString());
		col.setAttribute('y', (y*RECT_SIZE).toString());

		rect.setAttribute('style', `fill:rgb(${snake.check(x, y) ? '0, 0, 0' : '255,255,255'});stroke-width:1;stroke:rgb(0,0,0)`);

		col.appendChild(rect.cloneNode(false));
		viewPort.appendChild(col);
	}
}


root.appendChild(viewPort);