//? We've got `Fight`, `Idle_1`, `Sitting.001` and `Walk` as animations in the GLTF file.

const character = document.getElementById("aframe_player");

character.setAttribute("animation-mixer", "clip: Idle_1");

setTimeout(function () { character.setAttribute("animation-mixer", "clip: Walk; crossFadeDuration:0.5"); }, 6000);

document.addEventListener("keypress", function (event) {
    if (event.key === "w") {
        character.setAttribute("animation-mixer", "clip: Walk; crossFadeDuration:0.5");
        character.object3D.position.z += 0.1;
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key === "w") {
        character.setAttribute("animation-mixer", "clip: Idle_1; crossFadeDuration:0.5");
    }
});
