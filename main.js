const renderer = new Renderer();
const world = new World(renderer.scene);
const player = new Player(renderer.camera);

const overlay = document.getElementById("click");

overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  renderer.renderer.domElement.requestPointerLock();
});

function loop() {
  requestAnimationFrame(loop);
  player.update();
  renderer.render();
}

loop();
