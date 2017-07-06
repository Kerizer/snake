"use strict";
/**
 * Created by Pasha on 06-Jul-17.
 */

let root = document.querySelector('#root');

let viewPort = document.createElementNS('http://www.w3.org/2000/svg','svg');
viewPort.setAttribute('height', (COLS*RECT_SIZE).toString());
viewPort.setAttribute('width', (ROWS*RECT_SIZE).toString());

// let row = document.createElementNS('http://www.w3.org/2000/svg','g');
// let coll = document.createElementNS('http://www.w3.org/2000/svg','g');

let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
rect.setAttribute('width', RECT_SIZE);
rect.setAttribute('height', RECT_SIZE);
rect.setAttribute('style', "fill:rgb(255,255,255);stroke-width:1;stroke:rgb(0,0,0)");

// We have a ROWS x COLS matrix filled by `rect` elements
// let rectMatrix = new Array(COLS).fill(new Array(ROWS).fill(rect.cloneNode(false)));



// console.log(rectMatrix);
let i, j, row, col;
for (i=0; i<ROWS; i++) {
	row = document.createElementNS('http://www.w3.org/2000/svg','svg');
	for (j=0; j<ROWS; j++) {
		col = document.createElementNS('http://www.w3.org/2000/svg','svg');
		col.setAttribute('x', (j*RECT_SIZE).toString());
		col.setAttribute('y', (i*RECT_SIZE).toString());
		col.appendChild(rect.cloneNode(false));
		viewPort.appendChild(col);
	}
}


root.appendChild(viewPort);