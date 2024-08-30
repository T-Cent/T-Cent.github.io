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

document.addEventListener("click", (event) => {
    console.log(event.x, event.y);
})

const x = document.querySelector(".something");
console.log(x.x, x.y);

const press_button = document.querySelector("#exitbutton");
press_button.addEventListener("click", function () {
    press_button.style.backgroundColor = "blue";
    console.log("hello");
})

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(30, 30);
ctx.bezierCurveTo(120, 160, 180, 10, 220, 140);
ctx.stroke();
