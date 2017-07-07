"use strict";
/**
 * Created by Pasha on 06-Jul-17.
 */
const root = document.querySelector('#root');

const options = {
	ROWS:50,
	COLS:50,
	RECT_SIZE:12,
	SPEED:100,  // miliseconds
	INPUT_KEYS:{
		'37':'LEFT',
		'39':'RIGHT',
		'40':'BOTTOM',
		'38':'TOP'
	}
};
let view = new ViewPort(options);
root.appendChild(view.render());