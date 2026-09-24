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

