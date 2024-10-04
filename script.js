//! Handling the menu
const menu_x = document.getElementById("x");
const menu_y = document.getElementById("y");
const button = document.getElementById("menu");
const menu = document.getElementById("card");


let isOpen = false;
let currentRot = 90;

function deg(x) {
    return x + "deg";
}

button.addEventListener("click", () => {
    currentRot += 270;
    if (isOpen) {
        menu_y.style.transform = `translateY(-50%) rotate(${deg(currentRot)})`; // Plus
        card.style.width = "0%";
    } else {
        menu_y.style.transform = `translateY(-50%) rotate(${deg(currentRot)})`; // Minus
        card.style.width = "100%";
    }
    isOpen = !isOpen; // Toggle the state
});



//! Handling the background
function draw_curve (curve, start, end, control, factor, mouse_x, mouse_y, translate_x, translate_y) {
  const middle = new point((start.x + end.x)/2 + translate_x, (start.y + end.y)/2 + translate_y);
  const dist = middle.distance(new point(mouse_x, mouse_y));
//   const dist = mouse_x - start.x - translate_x;
//   factor = Math.E ** ((-0.01*dist)**2);
  control.add(new point(translate_x, translate_y));
  control.multiply(factor);
  factor = 0.99 ** dist
  control.multiply(factor);

//   console.log(factor);
//   control.multiply(new point(Math.sign(middle.x-mouse_x), Math.sign(middle.y-mouse_y)));
  curve.setAttribute("d", `M${start.print()} Q${control.print()} ${end.print()}`);
  curve.setAttribute("transform", `translate(${translate_x}, ${translate_y})`)
}


//* not implemented rn
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
let num_curves_x = Math.floor(width/spacing);
let num_curves_y = Math.floor(height/spacing);

//? Creating curves
for (let i = 0; i < num_curves_x + num_curves_y; i++) {
  background.appendChild(one_curve.cloneNode())
}
// Horizontal curves
const curves = document.querySelectorAll(".path_curve");
for (let i = 0; i < num_curves_x; i++) {
  draw_curve(curves[i], new point(0, 0), new point(20, height), new point(1, 80), new point(2, 4), 0, 0, i*spacing, 0);
}

// Vertical curves
for (let i = 0; i < num_curves_y; i++){
  draw_curve(curves[num_curves_x+i], new point(0, 50), new point(width, 50), new point(25, 20), new point(2, 4), 0, 0, 0, i*spacing);
}

document.addEventListener("mousemove", (event) => {
  const mouse_x = event.x;
  const mouse_y = event.y;
  // Create curves

  // Horizontal curves
  const curves = document.querySelectorAll(".path_curve");
  for (let i = 0; i < num_curves_x; i++) {
      draw_curve(curves[i], new point(0, 0), new point(20, height), new point(-mouse_x, -mouse_y), new point(0.9, 0.9), mouse_x, mouse_y, i*spacing, 0);
  }

  // Vertical curves
  for (let i = 0; i < num_curves_y; i++){
      draw_curve(curves[num_curves_x+i], new point(0, 50), new point(width, 50), new point(-mouse_x, -mouse_y), new point(0.9, 0.9), mouse_x, mouse_y, 0, i*spacing);
  }

})

let start_id;

document.addEventListener("mousedown", (event) => {

  start_id = setInterval(() => {}, 50);
  const mouse_x = event.x;
  const mouse_y = event.y;
  // Create curves

  // Horizontal curves
  const curves = document.querySelectorAll(".path_curve");
  for (let i = 0; i < num_curves_x; i++) {
      draw_curve(curves[i], new point(0, 0), new point(20, height), new point(-mouse_x, -mouse_y), new point(3, 3), mouse_x, mouse_y, i*spacing, 0);
  }

  // Vertical curves
  for (let i = 0; i < num_curves_y; i++){
      draw_curve(curves[num_curves_x+i], new point(0, 50), new point(width, 50), new point(-mouse_x, -mouse_y), new point(3, 3), mouse_x, mouse_y, 0, i*spacing);
  }

})

document.addEventListener("mouseup", (event) => {

  clearInterval(start_id);
  
  const mouse_x = event.x;
  const mouse_y = event.y;
  // Create curves

  // Horizontal curves
  const curves = document.querySelectorAll(".path_curve");
  for (let i = 0; i < num_curves_x; i++) {
      draw_curve(curves[i], new point(0, 0), new point(20, height), new point(-mouse_x, -mouse_y), new point(0.9, 0.9), mouse_x, mouse_y, i*spacing, 0);
  }

  // Vertical curves
  for (let i = 0; i < num_curves_y; i++){
      draw_curve(curves[num_curves_x+i], new point(0, 50), new point(width, 50), new point(-mouse_x, -mouse_y), new point(0.9, 0.9), mouse_x, mouse_y, 0, i*spacing);
  }

})

//! Handling the 3d scene
const movement_3d = document.querySelector("#camera");
let timesPressedShift = 0;

function toggleControls(value) {
    movement_3d.setAttribute("wasd-controls", `enabled: ${value}`);
    movement_3d.setAttribute("look-controls",  `enabled: ${value}`);
}
toggleControls("true");

document.addEventListener("keyup", (event) => {
    if (event.key === "Shift") {
        if (timesPressedShift === 0) {
            timesPressedShift = 1;
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

document.querySelector(".sphere_spt").addEventListener("mouseenter", (event) => {
    document.querySelector(".sphere_spt").setAttribute("material.color", "red")
})
document.querySelector(".sphere_spt").addEventListener("click", (event) => {
    // DelayNode(200);
    // setTimeout(window.open("./spt.html", "_self"), 600);
    window.open("./spt.html", "_self")
})

//! Menu bar
// const letters_foreground = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// let interval = null;

// const list_items = document.querySelectorAll("h1");

// list_items.forEach(element => {
//   element.onmouseover = event => {  
//     let iteration = 0;
    
//     clearInterval(interval);
    
//     interval = setInterval(() => {
//       event.target.innerText = event.target.innerText
//         .split("")
//         .map((letter, index) => {
//           if(index < iteration) {
//             return event.target.dataset.value[index];
//           }
        
//           return letters_foreground[Math.floor(Math.random() * letters_foreground.length)]
//         })
//         .join("");
      
//       if(iteration >= event.target.dataset.value.length){ 
//         clearInterval(interval);
    //   }
      
    //   iteration += 1/3;
//     }, 30);
//   }
// });


// const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789∀∃₍ⅦⅩⅬ∄ⅧⅳⅫↀ∂∈∋∆∉∌∑∜∯∬∭∰∤∣∵∲∹";

// const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))],
//       randomString = length => Array.from(Array(length)).map(randomChar).join("");

// const card = document.querySelector(".card"),
//       letters = card.querySelector(".card-letters");

// const handleOnMove = e => {
//   const rect = card.getBoundingClientRect(),
//         x = e.clientX - rect.left,
//         y = e.clientY - rect.top;


//   letters.innerText = randomString(1500);    
// }

// letters.innerText = randomString(Math.floor(window.innerHeight * window.innerWidth / 150));
// card.onmousemove = (e) => {letters.innerText = randomString(Math.floor(window.innerHeight * window.innerWidth / 150));}
