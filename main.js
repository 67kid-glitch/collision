// ===============================
// COLLISION — REAL GAME CORE
// ===============================

// --- SCENE SETUP ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e0e16);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- LIGHTING ---
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(10, 20, 10);
scene.add(sun);

// --- WORLD SYSTEM ---
let currentWorld = 0;
const worlds = [];

function createWorld(color) {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300),
    new THREE.MeshStandardMaterial({ color })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
  return ground;
}

worlds.push(createWorld(0x222233));
worlds.push(createWorld(0x332222));
worlds.push(createWorld(0x223322));

function switchWorld() {
  worlds[currentWorld].visible = false;
  currentWorld = (currentWorld + 1) % worlds.length;
  worlds[currentWorld].visible = true;
}

// --- PLAYER ---
const player = new THREE.Mesh(
  new THREE.BoxGeometry(1, 2, 1),
  new THREE.MeshStandardMaterial({ color: 0xff4444 })
);
player.position.set(0, 1, 0);
scene.add(player);

// --- PHYSICS ---
let velocityY = 0;
const GRAVITY = -0.015;
let grounded = false;

// --- CHARACTERS ---
const characters = [
  { name: "Mario", speed: 0.14, jump: 0.35 },
  { name: "Sans", speed: 0.12, jump: 0.28 },
  { name: "Red", speed: 0.16, jump: 0.32 }
];
let currentChar = 0;

// --- INPUT ---
let gamepadIndex = null;
window.addEventListener("gamepadconnected", e => gamepadIndex = e.gamepad.index);

// --- CAMERA ---
let camYaw = 0;
let camPitch = -0.35;
const DEADZONE = 0.15;

// --- LOOP ---
function animate() {
  requestAnimationFrame(animate);

  const gp = navigator.getGamepads()[gamepadIndex];
  let moveX = 0, moveZ = 0, camX = 0, camY = 0;
  let jump = false;
  let sprint = false;
  let swap = false;

  if (gp) {
    moveX = gp.axes[0];
    moveZ = gp.axes[1];
    camX = Math.abs(gp.axes[2]) > DEADZONE ? gp.axes[2] : 0;
    camY = Math.abs(gp.axes[3]) > DEADZONE ? gp.axes[3] : 0;
    jump = gp.buttons[0].pressed;
    sprint = gp.buttons[7].pressed;
    swap = gp.buttons[5].pressed;
  }

  // --- CHARACTER SWITCH ---
  if (swap) currentChar = (currentChar + 1) % characters.length;

  const char = characters[currentChar];
  let speed = char.speed * (sprint ? 1.6 : 1);

  // --- MOVEMENT ---
  camYaw += camX * 0.04;
  camPitch += camY * 0.04;
  camPitch = Math.max(-1.2, Math.min(-0.15, camPitch));

  const angle = camYaw;
  player.position.x += (Math.sin(angle) * -moveZ + Math.cos(angle) * moveX) * speed;
  player.position.z += (Math.cos(angle) * -moveZ - Math.sin(angle) * moveX) * speed;

  // --- JUMP ---
  if (jump && grounded) {
    velocityY = char.jump;
    grounded = false;
  }

  velocityY += GRAVITY;
  player.position.y += velocityY;

  if (player.position.y <= 1) {
    player.position.y = 1;
    velocityY = 0;
    grounded = true;
  }

  // --- CAMERA FOLLOW ---
  const camTarget = new THREE.Vector3(
    player.position.x + Math.sin(camYaw) * 7,
    player.position.y + 4,
    player.position.z + Math.cos(camYaw) * 7
  );

  camera.position.lerp(camTarget, 0.12);
  camera.lookAt(player.position.x, player.position.y + 1, player.position.z);

  renderer.render(scene, camera);
}

animate();

// --- RESIZE ---
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
