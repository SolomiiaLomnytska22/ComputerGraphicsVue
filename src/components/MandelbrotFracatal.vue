<template>
  <div class="fractal-container">
  <div class="input-form">
      <div class="input-field">
        <label for="ca">Enter value of Ca:</label>
        <input type="number" id="ca"  v-model="ca" placeholder="Real part" step="0.01" min="-1" max="1"/>
      </div>
      <div class="input-field">
        <label for="cb">Enter value of Cb:</label>
        <input type="number" id="cb"  v-model="cb" placeholder="Imaginary part" step="0.01"  min="-1" max="1"/>
      </div>
      <div class="input-field">
        <label for="iterations">Iterations:</label>
        <input type="number" id="iterations"  v-model="maxIterations" step="1" />
      </div>
      <div class="input-field">
        <label for="color">Set color:</label>
        <input type="color" id="color" v-model="color"/>
      </div>
      <div class="input-field">
        <label for="color">Background color:</label>
        <input type="range" id="color" v-model="hue" min="1" max="255" step="1" />
      </div>
      <div class="input-field">
        <label for="zoom">Zoom Lower Corner:</label>
        <input type="range" id="zoom-top" v-model="minSlider" min="-2.5" max="0" step="0.01" />
      </div>
      
      <div class="input-field">
        <label for="zoom">Zoom Upper Corner:</label>
        <input type="range" id="zoom-bottom" v-model="maxSlider" min="0" max="2.5" step="0.01" />
      </div>

      
      <v-btn class="btn" variant="flat" background-color = "white" color="#D73246" @click="draw">Build Fractal</v-btn>
    </div>
    <div id="fractal"></div>
   
  </div>
  
</template>

<script>
import p5 from "p5";

export default {
  data() {
    return {
      maxIterations: 100,
      minSlider: -2,
      maxSlider: 2,
      ca: "",
      cb: "",
      color: "#04101A",
      hue: 1,
    };
  },
  mounted() {
    this.sketch = new p5(this.p5sketch, "fractal");
  },
  methods: {
    draw() {
      if (this.sketch) {
        this.sketch.draw(this.ca, this.cb, this.maxIterations, this.minSlider, this.maxSlider, this.color, this.hue);
      }
    },
    navigateTo(route) {
      this.$router.push({ name: route });
    },
    p5sketch(p) {
      let minval, maxval;
      p.setup = function () {
        p.createCanvas(600, 760);
        p.pixelDensity(1);
        p.colorMode(p.HSB);
      
      };

      p.draw = function (thisca = "", thiscb = "", thismaxIterations=100, thisminSlider = -2, thismaxSlider = 2, thiscolor = "#04101A", thishue = 1) {
        p.loadPixels();
        
        minval = Number(thisminSlider);

      
        maxval = thismaxSlider;
        
        for (let x = 0; x < p.width; x++) {
          for (let y = 0; y < p.height; y++) {

            let a = p.map(x, 0, p.width, minval, maxval);
            let b = p.map(y, 0, p.height, minval, maxval);
            let ca = a, cb = b;         
           if (thisca.length!==0 && thiscb.length!==0) {
              ca = thisca;
              cb = thiscb;
            } 

            let n = 0;

            while (n < thismaxIterations) {
              let aa = a * a - b * b;
              let twoab = 2 * a * b;

              a = aa + ca;
              b = twoab + cb;

              if (p.abs(a + b) > 16) {
                break;
              }

              n++;
            }

        
            
            let brightness = 0;
            if (n < thismaxIterations) {
              brightness = 255;
            }

            const hex = thiscolor.replace(/^#/, "");

            const rr = parseInt(hex.substring(0, 2), 16);
            const gg = parseInt(hex.substring(2, 4), 16);
            const bb = parseInt(hex.substring(4, 6), 16);
            const rgbComponents = { r: rr, g: gg, b: bb };


            brightness = p.map(n+10, 0, thismaxIterations, 0, 100)
            let c = p.color(thishue, 255, brightness);
            
            let pix = (x + y * p.width) * 4;
            if (n == thismaxIterations) {
              p.pixels[pix + 0] = rgbComponents.r;
              p.pixels[pix + 1] = rgbComponents.g; 
              p.pixels[pix + 2] = rgbComponents.b;
              p.pixels[pix + 3] = 255;
            } else {
              p.pixels[pix + 0] = p.red(c);
              p.pixels[pix + 1] = p.green(c);
              p.pixels[pix + 2] = p.blue(c);
              p.pixels[pix + 3] = 255;
            }
          }
        }
        p.updatePixels();
        p.noLoop();
      };
    },
  },
};
</script>



