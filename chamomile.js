#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"
"use strict";


/*
 load an image and build a tubular jacquard from it
 */

if (process.argv.length < 3) {
	console.error("Usage:\n\timage-kp.js <image.png>");
	process.exit(1);
}

const image = process.argv[2];



const fs = require('fs');
const PNG = require('pngjs').PNG;
const png = PNG.sync.read(fs.readFileSync(image));
const Width = png.width;
const Height = png.height;


console.log(";!knitout-2")
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10")
const carrier1 = '1';
const carrier2 = '2';

console.log("x-stitch-number 102"); //WATCH OUT! User-configurable! SUGGEST: 33/26

const min = 1;
const max = Width;


console.log(`inhook ${carrier1}`);
//make a pattern of tucks:
// ... bfbfbf <-- always starts (on the right) with an 'f'

for(let i = max; i >= min; i -= 1){
	if ((max-i)%2 == 0) {
		console.log(`tuck - f${i} ${carrier1}`);
	} else {
		console.log(`tuck - b${i} ${carrier1}`);
	}
}
console.log(`releasehook ${carrier1}`);

//make the other-bed pattern (but now as knits):
// ... fbfbfb <-- always ends (on the right) with an 'b'

for(let i = min; i <= max; i += 1){
	if ((max-i)%2 == 0) {
		console.log(`tuck + b${i} ${carrier1}`);
	} else {
		console.log(`tuck + f${i} ${carrier1}`);
	}
}


//Now knit everything in a nice cross pattern with Carrier2:

console.log(`inhook ${carrier2}`);

//Use a "tuck pattern" to allow Carrier 2 to start on the back bed:
console.log(`miss + f${max + 1} ${carrier2}`);
console.log(`tuck + f${max + 2} ${carrier2}`);
console.log(`tuck + f${max + 4} ${carrier2}`);
console.log(`tuck - f${max + 5} ${carrier2}`);
console.log(`tuck - f${max + 3} ${carrier2}`);
console.log(`tuck - f${max + 1} ${carrier2}`);

//tuck pattern has secured the yarn, send the carrier out:
console.log(`releasehook ${carrier2}`);

for(let i = max; i >= min; i -= 1){
	if ((max-i)%2 == 0) {
		console.log(`knit - b${i} ${carrier2}`);
	} else {
		console.log(`knit - f${i} ${carrier2}`);
	}
}

//now that actual knitting has secured Carrier2, drop the tuck pattern:
for (let i = max+1; i <= max+5; i += 1) {
	console.log(`drop f${i}`);
}


//make the other-bed pattern (but now as knits):
// ... fbfbfb <-- always ends (on the right) with an 'b'

for(let i = min; i <= max; i += 1){
	if ((max-i)%2 == 0) {
		console.log(`knit + f${i} ${carrier2}`);
	} else {
		console.log(`knit + b${i} ${carrier2}`);
	}
}


let side = { };
side[carrier1] = '+';
side[carrier2] = '+';


for (let row = 0; row < Height; ++row) {
	//figure out where stitches should be based on the image:
	let color_choice = [];
	for (let c = 0; c < Width; ++c) {
		let col = {
			r:png.data[4*(png.width*(Height-1-row)+c)+0],
			g:png.data[4*(png.width*(Height-1-row)+c)+1],
			b:png.data[4*(png.width*(Height-1-row)+c)+2]
		};
		if (Math.abs(col.r - 255) <= 5 && Math.abs(col.g - 255) <= 5 && Math.abs(col.b - 255) <= 5) {
			color_choice.push('white');
		} else if (Math.abs(col.r - 0) <= 5 && Math.abs(col.g - 0) <= 5 && Math.abs(col.b - 0) <= 5) {
			color_choice.push('black');
		} else {
			console.warn(`Unrecognized color ${col.r}, ${col.g}, ${col.b}.`);
			color_choice.push(bed[c]);
		}
	}

	

	function do_carrier(carrier, character) {
		if (side[carrier] === '+') {
			//carrier is on the right, so knit to the left:
			for (let i = max; i >= min; i -= 1) {
				if (color_choice[i-min] === character) {
					console.log(`knit - f${i} ${carrier}`);
				} else {
					console.log(`knit - b${i} ${carrier}`);
				}
			}
			side[carrier] = '-';
		} else {
			//carrier is on the left, so knit to the right:
			for (let i = min; i <= max; i += 1) {
				if (color_choice[i-min] === character) {
					console.log(`knit + f${i} ${carrier}`);
				} else {
					console.log(`knit + b${i} ${carrier}`);
				}
			}
			side[carrier] = '+';
		}
	}
	
	do_carrier(carrier2, 'black');
	do_carrier(carrier1, 'white');    
}


console.log("outhook " + carrier1);
console.log("outhook " + carrier2);


for (let n = min-4; n <= max+4; ++n) {
	console.log("drop f" + n);
}
for (let n = min-4; n <= max+4; ++n) {
	console.log("drop b" + n);
}





