//? We've got `Fight`, `Idle_1`, `Sitting.001` `Walk`, `bow.001`, `wave`, `turning`, `turning_opp` `walking_back`, `open`,  as animations in the GLTF file.

const character = document.getElementById("aframe_player");
const camera = document.getElementById("camera");

// Simplified camera follow settings
const cameraConfig = {
  height: 1.8,              
  distance: 5,              // Distance behind character
  smoothing: 0.05           // Lower = smoother (0-1)
};

const characterState = {
  isMoving: false
};

var run_once = false;
character.setAttribute("animation-mixer", "clip: wave;");

// Set initial animation
document.addEventListener("animation-loop", function () {
  if (run_once) return;
  run_once = true;
  character.setAttribute("animation-mixer", "clip: Idle_1; crossFadeDuration:0.3");
});

// Simple camera initialization
function initializeCamera() {
  camera.object3D.position.set(0, cameraConfig.height, 5); // Start behind character
  camera.object3D.lookAt(character.object3D.position);
}

// Simple camera follow function
function updateCamera() {
  const characterPos = character.object3D.position;
  const characterRot = character.object3D.rotation;
  
  // Calculate position behind character based on character's rotation
  const cameraX = characterPos.x - Math.sin(characterRot.y) * cameraConfig.distance;
  const cameraZ = characterPos.z - Math.cos(characterRot.y) * cameraConfig.distance;
  
  // Smoothly move camera to new position
  camera.object3D.position.x += (cameraX - camera.object3D.position.x) * cameraConfig.smoothing;
  camera.object3D.position.y = cameraConfig.height;
  camera.object3D.position.z += (cameraZ - camera.object3D.position.z) * cameraConfig.smoothing;
  
  // Make camera look at character
  const lookTarget = new THREE.Vector3(
    characterPos.x,
    characterPos.y + 1.0, // Look at head level
    characterPos.z
  );
  
  camera.object3D.lookAt(lookTarget);
}

// Key state tracking
const keyState = {
  w: false,
  a: false,
  s: false,
  d: false
};

// Key press handling
document.addEventListener("keydown", function(event) {
  if (event.key === "w" || event.key === "s") {
    keyState[event.key] = true;
    characterState.isMoving = true;
  }
  if (event.key === "a" || event.key === "d") {
    keyState[event.key] = true;
  }
  
  // Action keys
  if (event.key === "b") {
    character.setAttribute("animation-mixer", "clip: bow.001; crossFadeDuration:0.3");
  }
  if (event.key === "h") {
    character.setAttribute("animation-mixer", "clip: wave; crossFadeDuration:0.3");
  }
});

document.addEventListener("keyup", function(event) {
  if (event.key === "w" || event.key === "a" || event.key === "s" || event.key === "d") {
    keyState[event.key] = false;
    
    // Check if any movement keys are still pressed
    characterState.isMoving = keyState.w || keyState.a || keyState.s || keyState.d;
    
    // If no movement keys are pressed, return to idle
    if (!characterState.isMoving) {
      character.setAttribute("animation-mixer", "clip: Idle_1; crossFadeDuration:0.5");
    }
  }
});

// Main update loop
function update() {
  const rotationSpeed = 0.05;
  const moveSpeed = 0.05;
  const backSpeed = 0.03;
  
  if (keyState.w) {
    character.object3D.position.x += Math.sin(character.object3D.rotation.y) * moveSpeed;
    character.object3D.position.z += Math.cos(character.object3D.rotation.y) * moveSpeed;
    character.setAttribute("animation-mixer", "clip: Walk; crossFadeDuration:0.3");
    updateCamera();
  }
  
  if (keyState.s) {
    character.object3D.position.x -= Math.sin(character.object3D.rotation.y) * backSpeed;
    character.object3D.position.z -= Math.cos(character.object3D.rotation.y) * backSpeed;
    character.setAttribute("animation-mixer", "clip: walking_back; crossFadeDuration:0.3");
    updateCamera();
  }
  
  if (keyState.a) {
    character.object3D.rotation.y += rotationSpeed;
    character.setAttribute("animation-mixer", "clip: turning_opp; crossFadeDuration:0.3");
  }
  
  if (keyState.d) {
    character.object3D.rotation.y -= rotationSpeed;
    character.setAttribute("animation-mixer", "clip: turning; crossFadeDuration:0.3");
  }
  
  
  // Continue animation loop
  requestAnimationFrame(update);
}

// Initialize and start
initializeCamera();
setTimeout(update, 500);