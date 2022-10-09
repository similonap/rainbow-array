import { rainbow } from "./index";

test('hex color array', () => {
    let arr = rainbow(7, "hex", false);
    console.log(arr[5]);
});

test('hsl color array', () => {
    for (let i=0; i<1000; i++) {
        rainbow(i, "hsl", false);
    }
});

test('rgb color array', () => {
    for (let i=0; i<1000; i++) {
        rainbow(i, "rgb", false);
    }
});

