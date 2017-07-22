"use strict";
/**
 * Created by Pasha on 06-Jul-17.
 */

var root = document.querySelector('#root');

var options = {
	ROWS: 50,
	COLS: 50,
	RECT_SIZE: 12,
	SPEED: 100, // miliseconds
	INPUT_KEYS: {
		'37': 'LEFT',
		'39': 'RIGHT',
		'40': 'BOTTOM',
		'38': 'TOP'
	}
};
var view = new ViewPort(options);
root.appendChild(view.render());