
//! Handling the background
function draw_curve (curve, start, end, control, factor, mouse_x, mouse_y, translate_x, translate_y) {
  const middle = new point((start.x + end.x)/2 + translate_x, (start.y + end.y)/2 + translate_y);
//   const dist = middle.distance(new point(mouse_x, mouse_y));
  const dist = mouse_x - start.x - translate_x;
  factor = Math.E ** ((-0.01*dist)**2);
//   console.log(factor);
//   control.multiply(factor);
//   control.multiply(new point(Math.sign(middle.x-mouse_x), Math.sign(middle.y-mouse_y)));
  curve.setAttribute("d", `M${start.print()} Q${control.print()} ${end.print()}`);
  curve.setAttribute("transform", `translate(${translate_x}, ${translate_y})`)
}


//! not implemented rn
function animate (factor, targetFactor, step) {
  if (factor < targetFactor) {
      factor = Math.min(factor + step, targetFactor);
  } else if (factor > targetFactor) {
      factor = Math.max(factor - step, targetFactor);
  }
}

class point {
  constructor (x, y) {
      this.x = x;
      this.y = y;
  }

  add (p) {
      if (typeof p === "number") {
          this.x += p;
          this.y += p;
      } else {
          this.x += p.x;
          this.y += p.y;
      }
  }

  multiply (p) {
      if (typeof p === "number") {
          this.x *= p;
          this.y *= p;
      } else {
          this.x *= p.x;
          this.y *= p.y;
      }
  }
  
  distance (p) {
      return ((this.x - p.x)**2 + (this.y - p.y)**2)**0.5
  }

  length () {
  return (this.x**2 + this.y**2)**0.5;
  }
  
  print () {
      return `${this.x},${this.y}`;
  }
}

const height = window.innerHeight;
const width  = window.innerWidth;
const background = document.querySelector("#background");
const one_curve = document.querySelector(".path_curve");
const spacing = 25;
let num_curves_x = width/spacing;
let num_curves_y = height/spacing;

//? Creating curves
for (let i = 0; i < num_curves_x + num_curves_y; i++) {
  background.appendChild(one_curve.cloneNode())
}
// Horizontal curves
const curves = document.querySelectorAll(".path_curve");
for (let i = 0; i < num_curves_x; i++) {
  draw_curve(curves[i], new point(50, 0), new point(50, 600), new point(1, 80), new point(2, 4), 0, 0, i*spacing, 0);
}

// Vertical curves
for (let i = 0; i < num_curves_y; i++){
  draw_curve(curves[num_curves_x+i], new point(0, 50), new point(1200, 50), new point(25, 20), new point(2, 4), 0, 0, 0, i*spacing);
}

document.addEventListener("mousemove", (event) => {
  const mouse_x = event.x;
  const mouse_y = event.y;
  // Create curves

  // Horizontal curves
  const curves = document.querySelectorAll(".path_curve");
  for (let i = 0; i < num_curves_x; i++) {
      draw_curve(curves[i], new point(50, 0), new point(50, 600), new point(100, 100), new point(1, 1), mouse_x, mouse_y, i*spacing, 0);
  }

  // Vertical curves
  for (let i = 0; i < num_curves_y; i++){
      draw_curve(curves[num_curves_x+i], new point(0, 50), new point(1200, 50), new point(100, 100), new point(mouse_x, mouse_y), mouse_x, mouse_y, 0, i*spacing);
  }

})

//! Handling the 3d scene
const movement_3d = document.querySelector("#camera");
let timesPressedShift = 0;

function toggleControls(value) {
    movement_3d.setAttribute("wasd-controls", `enabled: ${value}`);
    movement_3d.setAttribute("look-controls",  `enabled: ${value}`);
}

document.addEventListener("keyup", (event) => {
    if (event.key === "Shift") {
        if (timesPressedShift === 0) {
            timesPressedShift = 1;
            toggleControls("true");
        } else if (timesPressedShift === 1) {
            timesPressedShift = 0;
            toggleControls("false");
        }
    }
})

// AFRAME.registerComponent("foo", {
//     events : {
//         click: function (event) {
//             console.log("i was touched");
//             this.el.setAttribute('material', 'color', 'red');
//         }
//     }
// })

document.querySelector(".sphere_zpc").addEventListener("mouseenter", (event) => {
    document.querySelector(".sphere_zpc").setAttribute("material.color", "red")
})
document.querySelector(".sphere_zpc").addEventListener("click", (event) => {
    // DelayNode(200);
    // setTimeout(window.open("./zpc.html", "_self"), 600);
    window.open("./zpc.html", "_self")
})

