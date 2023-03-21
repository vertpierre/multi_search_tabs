function getDominantColorsFromImage(imageSrc) {
  return new Promise((resolve, reject) => {
    // Step 1: Load the image
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      // Step 2: Create a canvas
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(this, 0, 0);

      // Step 3: Get the image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Step 4-6: Count the color occurrences
      const colorCounts = {};
      for (let i = 0; i < data.length; i += 8) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const rgb = `rgb(${r},${g},${b})`;
        if (colorCounts[rgb]) {
          colorCounts[rgb]++;
        } else {
          colorCounts[rgb] = 1;
        }
      }

      // Step 7: Sort the colors by hue
      const colors = Object.keys(colorCounts).sort((a, b) => {
        // Convert RGB color to HSL color
        const hslA = rgbToHsl(a);
        const hslB = rgbToHsl(b);
        // Sort by hue
        return hslA[0] - hslB[0];
      });

      // Step 8: Choose the three most different colors
      const mostDifferentColors = [colors[0]];
      let lastHsl = rgbToHsl(colors[0]);
      for (let i = 1; i < colors.length && mostDifferentColors.length < 3; i++) {
        const hsl = rgbToHsl(colors[i]);
        const hueDiff = Math.abs(hsl[0] - lastHsl[0]);
        const satDiff = Math.abs(hsl[1] - lastHsl[1]);
        const lightDiff = Math.abs(hsl[2] - lastHsl[2]);
        const totalDiff = hueDiff + satDiff + lightDiff;
        if (totalDiff > 0.6) {
          mostDifferentColors.push(colors[i]);
          lastHsl = hsl;
        }
      }

      const rgbValues = mostDifferentColors.map((color) => {
        return color.match(/\d+/g).map(Number);
      });

      resolve(rgbValues);
    };

    img.onerror = function () {
      reject("Error loading image");
    };

    img.src = imageSrc;
  });
}

// Helper function to convert RGB color to HSL color
function rgbToHsl(rgb) {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  const hsl = [];

  const rNormalized = r / 255;
  const gNormalized = g / 255;
  const bNormalized = b / 255;

  const cmax = Math.max(rNormalized, gNormalized, bNormalized);
  const cmin = Math.min(rNormalized, gNormalized, bNormalized);
  const delta = cmax - cmin;

  let h;
  if (delta === 0) {
    h = 0;
  } else if (cmax === rNormalized) {
    h = ((gNormalized - bNormalized) / delta) % 6;
  } else if (cmax === gNormalized) {
    h = (bNormalized - rNormalized) / delta + 2;
  } else {
    h = (rNormalized - gNormalized) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  const l = (cmax + cmin) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  hsl.push(h, s, l);

  return hsl;
}

const images = document.getElementsByTagName("img");

for (let i = 0; i < images.length; i++) {
  const imageSrc = "images[i].src";

  getDominantColorsFromImage(imageSrc)
    .then((rgbValues) => {
      // Do something with the RGB color values returned by the function
      console.log(rgbValues);
    })
    .catch((error) => {
      console.error(error);
    });
}
