function rgbToHex(r: number, g: number, b: number) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbToHsl(r: number, g: number, b: number) {
	(r /= 255), (g /= 255), (b /= 255);

	var max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	var h: number,
		s: number,
		l: number = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}

		h = h! / 6;
	}

	return { h: h, s: s, l: l };
}

export type Color = HexColor | RgbColor | HslColor;

export type HexColor = { hex: string };
export type RgbColor = { r: number; g: number; b: number };
export type HslColor = { h: number; s: number; l: number };

function rainbow(arrayLength: number, type?: 'hex', pastel?: boolean): HexColor[];
function rainbow(arrayLength: number, type?: 'hsl', pastel?: boolean): HslColor[];
function rainbow(arrayLength: number, type?: 'rgb', pastel?: boolean): HslColor[];
function rainbow(arrayLength: number, type: 'hex' | 'hsl' | 'rgb' = "hex", pastel: boolean = false): Color[] {
	var eq1 = 127;
	var eq2 = 128;
	if (arrayLength == undefined) {
		arrayLength = 24;
	}
	if (type == undefined) {
		type = 'rgb';
	}
	if (pastel == true) {
		eq1 = 55;
		eq2 = 200;
	}
	let frequency = (Math.PI * 2) / arrayLength;

	var cvparr = [];
	for (var i = 0; i < arrayLength; ++i) {
		let red = Math.sin(frequency * i + 2) * eq1 + eq2;
		let green = Math.sin(frequency * i + 0) * eq1 + eq2;
		let blue = Math.sin(frequency * i + 4) * eq1 + eq2;

		switch (type) {
			case 'hex':
				cvparr.push({ hex: rgbToHex(Math.round(red), Math.round(green), Math.round(blue)) });
				break;
			case 'rgb':
				cvparr.push({ r: Math.floor(red), g: Math.floor(green), b: Math.floor(blue) });
				break;
			case 'hsl':
				cvparr.push(rgbToHsl(Math.round(red), Math.round(green), Math.round(blue)));
				break;
		}
	}
	return cvparr;
}

export { rainbow };
