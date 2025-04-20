//? We've got `Fight`, `Idle_1`, `Sitting.001` `Walk`, `bow.001`, `wave`, `turning.001`, `turning_opp.001` `walking_back`, `open`,  as animations in the GLTF file.

const character = document.getElementById("aframe_player");
const camera = document.getElementById("camera");

// Camera follow settings
const cameraFollowConfig = {
  height: 1.8,              
  distance: 3,              
  smoothing: 0.1,           // Lower = smoother (0-1)
  rotationSmoothing: 0.05, 
  lookAhead: 0.5           
};

const characterState = {
  isMoving: false,
  currentDirection: new THREE.Vector3(0, 0, -1), // Forward direction
  speed: 0,
  rotationSpeed: 0.05
};

const cameraState = {
  introSequence: true,
  introProgress: 0,
  introDuration: 5000,
  startTime: Date.now()
};

// Initialize animation state
var run_once = false;
character.setAttribute("animation-mixer", "clip: wave;");

// in front of character
function setupInitialCameraPosition() {
  const characterPosition = character.object3D.position;
  
  camera.object3D.position.set(
    characterPosition.x,
    characterPosition.y + 1.6, // Eye level
    characterPosition.z + 4 // In front
  );
  
  camera.object3D.lookAt(
    characterPosition.x,
    characterPosition.y + 1.5,
    characterPosition.z
  );
}

setupInitialCameraPosition();

document.addEventListener("animation-loop", function (action, loopDelta) {
  if (run_once) return;
  run_once = true;
  character.setAttribute("animation-mixer", "clip: Idle_1; crossFadeDuration:0.3");
});

function updateCameraPosition(update) {
  const characterPosition = character.object3D.position;
  const characterRotation = character.object3D.rotation;

  if (cameraState.introSequence) {
    const elapsed = Date.now() - cameraState.startTime;
    cameraState.introProgress = Math.min(elapsed / cameraState.introDuration, 1);
    
    // When intro is complete
    if (cameraState.introProgress >= 1) {
      cameraState.introSequence = false;
    } else {
      // Interpolate camera from front view to behind character
      const frontPosition = new THREE.Vector3(
        characterPosition.x,
        characterPosition.y + 1.6,
        characterPosition.z + 4
      );
      
      const backPosition = new THREE.Vector3(
        characterPosition.x,
        characterPosition.y + cameraFollowConfig.height,
        characterPosition.z - cameraFollowConfig.distance
      );
      
      // lerp is linear interpolation
      const currentPos = new THREE.Vector3().lerpVectors(
        frontPosition,
        backPosition,
        cameraState.introProgress
      );
      
      camera.object3D.position.copy(currentPos);
      
      // Always look at character during intro
      camera.object3D.lookAt(
        characterPosition.x,
        characterPosition.y + 1.5,
        characterPosition.z
      );
      
      return; // Skip normal camera update during intro
    }
  }

  // Calculate camera target position
  // We want the camera to be behind and slightly above the character
  const cameraOffset = new THREE.Vector3(
    -Math.sin(characterRotation.y) * cameraFollowConfig.distance,
    cameraFollowConfig.height,
    -Math.cos(characterRotation.y) * cameraFollowConfig.distance
  );

  // Calculate look target (slightly ahead of character)
  const lookTarget = new THREE.Vector3(
    characterPosition.x + Math.sin(characterRotation.y) * cameraFollowConfig.lookAhead,
    characterPosition.y + 1.5,
    characterPosition.z + Math.cos(characterRotation.y) * cameraFollowConfig.lookAhead
  );

  // Get current camera position
  const currentCameraPosition = camera.object3D.position;

  // Smoothly interpolate between current and target positions
  const targetCameraPosition = new THREE.Vector3(
    characterPosition.x + cameraOffset.x,
    characterPosition.y + cameraOffset.y,
    characterPosition.z + cameraOffset.z
  );

  // Apply position smoothing
  currentCameraPosition.lerp(targetCameraPosition, cameraFollowConfig.smoothing);
  
  // Make camera look at character (or slightly ahead)
  camera.object3D.lookAt(lookTarget);
}

// Key state tracking to handle movement more smoothly
const keyState = {
  w: false,
  a: false,
  s: false,
  d: false
};

// Key press handling
document.addEventListener("keydown", function(event) {
  if (event.key === "w" || event.key === "a" || event.key === "s" || event.key === "d") {
    keyState[event.key] = true;
    characterState.isMoving = true;
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

// Main update loop for smooth movement and camera following
function update() {
  // Handle movement based on key states
  let movementOccurred = false;
  
  if (keyState.w) {
    const moveSpeed = 0.05;
    character.object3D.position.x += Math.sin(character.object3D.rotation.y) * moveSpeed;
    character.object3D.position.z += Math.cos(character.object3D.rotation.y) * moveSpeed;
    character.setAttribute("animation-mixer", "clip: Walk; crossFadeDuration:0.3");
    movementOccurred = true;
  }
  
  if (keyState.s) {
    const moveSpeed = 0.03;
    character.object3D.position.x -= Math.sin(character.object3D.rotation.y) * moveSpeed;
    character.object3D.position.z -= Math.cos(character.object3D.rotation.y) * moveSpeed;
    character.setAttribute("animation-mixer", "clip: walking_back; crossFadeDuration:0.3");
    movementOccurred = true;
  }
  
  if (keyState.a) {
    // Just rotate character, don't move camera automatically
    character.object3D.rotation.y += characterState.rotationSpeed;
    character.setAttribute("animation-mixer", "clip: turning_opp.001; crossFadeDuration:0.3");
    movementOccurred = true;
  }
  
  if (keyState.d) {
    // Just rotate character, don't move camera automatically
    character.object3D.rotation.y -= characterState.rotationSpeed;
    character.setAttribute("animation-mixer", "clip: turning.001; crossFadeDuration:0.3");
    movementOccurred = true;
  }
  
  updateCameraPosition();
  
  // Continue animation loop
  requestAnimationFrame(update);
}

update();