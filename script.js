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
    isOpen = !isOpen;
});

//! Handling the background
function modify_curve(curve, start, end, control, factor, mouse_x, mouse_y, translate_x, translate_y) {
    const middle = new point((start.x + end.x) / 2 + translate_x, (start.y + end.y) / 2 + translate_y);
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

class point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(p) {
        if (typeof p === "number") {
            this.x += p;
            this.y += p;
        } else {
            this.x += p.x;
            this.y += p.y;
        }
    }

    multiply(p) {
        if (typeof p === "number") {
            this.x *= p;
            this.y *= p;
        } else {
            this.x *= p.x;
            this.y *= p.y;
        }
    }

    distance(p) {
        return ((this.x - p.x) ** 2 + (this.y - p.y) ** 2) ** 0.5
    }

    length() {
        return (this.x ** 2 + this.y ** 2) ** 0.5;
    }

    print() {
        this.x = isNaN(this.x) ? 300 : this.x;
        this.y = isNaN(this.y) ? 300 : this.y;
        return `${this.x},${this.y}`;
    }
}

const height = window.innerHeight;
const width = window.innerWidth;
const background = document.querySelector("#background");
const one_curve = document.querySelector(".path_curve");
const spacing = 25;
let num_curves_x = Math.floor(width / spacing);
let num_curves_y = Math.floor(height / spacing);

//? Creating curves
for (let i = 0; i < num_curves_x + num_curves_y; i++) {
    background.appendChild(one_curve.cloneNode())
}

// positioning horizontal curves
const curves = document.querySelectorAll(".path_curve");
for (let i = 0; i < num_curves_x; i++) {
    modify_curve(curves[i], new point(0, 0), new point(20, height), new point(1, 80), new point(2, 4), 0, 0, i * spacing, 0);
}

// positioning vertical curves
for (let i = 0; i < num_curves_y; i++) {
    modify_curve(curves[num_curves_x + i], new point(0, 50), new point(width, 50), new point(25, 20), new point(2, 4), 0, 0, 0, i * spacing);
}

document.addEventListener("mousemove", (event) => {
    const mouse_x = event.x;
    const mouse_y = event.y;

    // Horizontal curves
    const curves = document.querySelectorAll(".path_curve");
    for (let i = 0; i < num_curves_x; i++) {
        modify_curve(curves[i], new point(0, 0), new point(20, height), new point(-mouse_x, -mouse_y), new point(0.9, 0.9), mouse_x, mouse_y, i * spacing, 0);
    }

    // Vertical curves
    for (let i = 0; i < num_curves_y; i++) {
        modify_curve(curves[num_curves_x + i], new point(0, 50), new point(width, 50), new point(-mouse_x, -mouse_y), new point(0.9, 0.9), mouse_x, mouse_y, 0, i * spacing);
    }
    
})

let start_id;

// TODO: make this touch event better
document.addEventListener("mousedown", (event) => {
    start_id = setInterval(() => { }, 50);
    const mouse_x = event.x;
    const mouse_y = event.y;

    // Horizontal curves
    const curves = document.querySelectorAll(".path_curve");
    for (let i = 0; i < num_curves_x; i++) {
        modify_curve(curves[i], new point(0, 0), new point(20, height), new point(-mouse_x, -mouse_y), new point(3, 3), mouse_x, mouse_y, i * spacing, 0);
    }

    // Vertical curves
    for (let i = 0; i < num_curves_y; i++) {
        modify_curve(curves[num_curves_x + i], new point(0, 50), new point(width, 50), new point(-mouse_x, -mouse_y), new point(3, 3), mouse_x, mouse_y, 0, i * spacing);
    }

})

document.addEventListener("mouseup", (event) => {
    clearInterval(start_id);

    const mouse_x = event.x;
    const mouse_y = event.y;

    // Horizontal curves
    const curves = document.querySelectorAll(".path_curve");
    for (let i = 0; i < num_curves_x; i++) {
        modify_curve(curves[i], new point(0, 0), new point(20, height), new point(-mouse_x, -mouse_y), new point(0.9, 0.9), mouse_x, mouse_y, i * spacing, 0);
    }

    // Vertical curves
    for (let i = 0; i < num_curves_y; i++) {
        modify_curve(curves[num_curves_x + i], new point(0, 50), new point(width, 50), new point(-mouse_x, -mouse_y), new point(0.9, 0.9), mouse_x, mouse_y, 0, i * spacing);
    }

})

//! Handling the 3d scene
//TODO: changing color doesn't work, i don't know why
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