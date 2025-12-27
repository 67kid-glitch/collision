const structures = new StructureSystem(renderer.scene);

// Spawn structures
structures.spawn("trialChamber", 10, 10);
structures.spawn("woodlandMansion", -20, 10);
structures.spawn("fortress", 15, -20);
structures.spawn("bastion", -15, -20);

// Mob spawner
const spawner = new Spawner(renderer.scene, "Zombie", 5, 5);

// Redstone
const redstone = new Redstone();
const lamp = new RedstoneLamp(renderer.scene, redstone, 0, 5);

window.addEventListener("keydown", e => {
  if (e.key === "r") redstone.toggle();
});

function loop() {
  requestAnimationFrame(loop);
  player.update();
  mobs.update(player, renderer.camera);
  spawner.update(mobs);
  lamp.update();
  renderer.render();
}
