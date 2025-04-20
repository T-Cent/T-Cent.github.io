//? We've got `Fight`, `Idle_1`, `Sitting.001` `Walk`, `bow.001`, `hello.001`, `turning.001`, `turning_opp.001` and `walking_back` as animations in the GLTF file.

const character = document.getElementById("aframe_player");
const camera = document.getElementById("camera");

var run_once = false;
character.setAttribute("animation-mixer", "clip: hello.001;");
document.addEventListener("animation-loop", function (action, loopDelta) {
    if (run_once) return;
    run_once = true;
    character.setAttribute("animation-mixer", "clip: Idle_1; crossFadeDuration:0.3");
});


document.addEventListener("keypress", function (event) {
    console.log(character.object3D.rotation);
    if (event.key === "w") {
        character.object3D.position.z += 0.05;
        character.setAttribute("animation-mixer", "clip: Walk; crossFadeDuration:0.3");
    }
    if (event.key === "s") {
        character.object3D.position.z -= 0.02;
        character.setAttribute("animation-mixer", "clip: walking_back; crossFadeDuration:0.3");
    }
    if (event.key === "a") {
        // character.object3D.position.x -= 0.1;
        // character.object3D.rotation.y += 0.1;
        // camera.object3D.rotation.y += -0.1;
        character.setAttribute("animation-mixer", "clip: turning_opp.001; crossFadeDuration:0.3; clampWhenFinished: true");
    }
    if (event.key === "d") {
        character.setAttribute("animation-mixer", "clip: turning.001; crossFadeDuration:0.3");
        // character.object3D.position.x += 0.1;
    }
});

document.addEventListener("keyup", function (event) {
        character.setAttribute("animation-mixer", "clip: Idle_1; crossFadeDuration:0.5");
});
