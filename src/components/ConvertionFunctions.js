function cmykToRgb(c, m, y, k) {
  var r = 255 * (1 - c) * (1 - k);
  var g = 255 * (1 - m) * (1 - k);
  var b = 255 * (1 - y) * (1 - k);

  return [Math.round(r), Math.round(g), Math.round(b)];
}

function rgbToCmyk(r, g, b) {
  r = r / 255;
  g = g / 255;
  b = b / 255;

  var k = 1 - Math.max(r, g, b);
  var c = (1 - r - k) / (1 - k);
  var m = (1 - g - k) / (1 - k);
  var y = (1 - b - k) / (1 - k);

  return [c, m, y, k];
}

function hsvToRgb(hue, saturation, value) {
  if (hue < 0 || hue > 1) {
    hue = hue - Math.floor(hue);
  }
  if (saturation < 0) {
    saturation = 0;
  }
  if (saturation > 1) {
    saturation = 1;
  }
  if (value < 0) {
    value = 0;
  }
  if (value > 1) {
    value = 1;
  }
  let chroma = value * saturation;
  let hue1 = hue * 6;
  let x = chroma * (1 - Math.abs((hue1 % 2) - 1));
  let r1, g1, b1;
  if (hue1 >= 0 && hue1 <= 1) {
    [r1, g1, b1] = [chroma, x, 0];
  } else if (hue1 <= 2) {
    [r1, g1, b1] = [x, chroma, 0];
  } else if (hue1 <= 3) {
    [r1, g1, b1] = [0, chroma, x];
  } else if (hue1 <= 4) {
    [r1, g1, b1] = [0, x, chroma];
  } else if (hue1 <= 5) {
    [r1, g1, b1] = [x, 0, chroma];
  } else if (hue1 <= 6) {
    [r1, g1, b1] = [chroma, 0, x];
  }
  let m = value - chroma;
  let [r, g, b] = [r1 + m, g1 + m, b1 + m];

  return [255 * r, 255 * g, 255 * b];
}

function rgbToHsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    v = max;

  let d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
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
      default:
        break;
    }
    h /= 6;
  }

  return [h, s, v];
}

module.exports = { cmykToRgb, rgbToCmyk, hsvToRgb, rgbToHsv };
