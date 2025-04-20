//? We've got `Fight`, `Idle_1`, `Sitting.001` `Walk`, `bow.001`, `wave`, `turning`, `turning_opp` `walking_back`, `open`,  as animations in the GLTF file.

const character = document.getElementById("aframe_player");
const camera = document.getElementById("camera"); // this is the parent of the actual camera and `a-camera` does not have rot

// Main update loop

const rotationSpeed = 0.05;
const moveSpeed = 0.05;
const backSpeed = 0.02;

//! y points up!! absolutely disgraceful

document.addEventListener("keydown", (event) => {
    if (event.shiftKey && event.key === "w") {
        camera.object3D.position.x += Math.sin(character.object3D.rotation.y) * moveSpeed;
        camera.object3D.position.z += Math.cos(character.object3D.rotation.y) * moveSpeed;
    }
    if (event.shiftKey && event.key === "s") {
        camera.object3D.position.x -= Math.sin(character.object3D.rotation.y) * backSpeed;
        camera.object3D.position.z -= Math.cos(character.object3D.rotation.y) * backSpeed;
    }    
if (event.key === "w") {
    character.object3D.position.x += Math.sin(character.object3D.rotation.y) * moveSpeed;
    character.object3D.position.z += Math.cos(character.object3D.rotation.y) * moveSpeed;
    camera.object3D.position.x = character.object3D.position.x - 2;
    camera.object3D.position.z = character.object3D.position.z - 2;
    character.setAttribute("animation-mixer", "clip: Walk; crossFadeDuration:0.3");
}

if (event.key === "s") {
    character.object3D.position.x -= Math.sin(character.object3D.rotation.y) * backSpeed;
    character.object3D.position.z -= Math.cos(character.object3D.rotation.y) * backSpeed;
    camera.object3D.position.x = character.object3D.position.x - 2;
    camera.object3D.position.z = character.object3D.position.z - 2;
    character.setAttribute("animation-mixer", "clip: walking_back; crossFadeDuration:0.3");
}

if (event.key === "a") {
    character.setAttribute("animation-mixer", "clip: turning; crossFadeDuration:0.3");
    character.object3D.rotation.y += rotationSpeed;
}

if (event.key === "d") {
    character.setAttribute("animation-mixer", "clip: turning_opp; crossFadeDuration:0.3");
    character.object3D.rotation.y -= rotationSpeed;
}

// Continue animation loop
// requestAnimationFrame();
// console.log(character.object3D.position);


const characterPos = character.object3D.position;
const cameraPos = camera.object3D.position;

// Calculate angle between camera and character
const dx = characterPos.x - cameraPos.x;
const dz = characterPos.z - cameraPos.z;

// Calculate rotation around Y axis (horizontal rotation)
const targetRotationY = Math.atan2(dx, dz);

// Apply rotation directly to camera
camera.object3D.rotation.y = targetRotationY;

// Calculate rotation around X axis (vertical tilt)
const dy = (characterPos.y + 1.0) - cameraPos.y; // +1.0 to aim at head level
const horizontalDistance = Math.sqrt(dx * dx + dz * dz);
const targetRotationX = -Math.atan2(dy, horizontalDistance);

// camera.object3D.rotation.x = targetRotationX;

// camera.object3D.position.x += ;
// camera.object3D.position.z += character.object3D.position.z - camera.object3D.position.z;
});

document.addEventListener("keyup", (event) => {
    character.setAttribute("animation-mixer", "clip: Idle_1; crossFadeDuration:0.3");
    // if (event.key === "a") {
    //     character.object3D.rotation.y += 0.05;
    // }
    // if (event.key === "d") {
    //     character.object3D.rotation.y -= 0.05;
    // }
});