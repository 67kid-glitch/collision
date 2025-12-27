class StructureSystem {
  constructor(scene) {
    this.scene = scene;
  }

  spawn(name, x, z) {
    const data = STRUCTURES[name];
    if (!data) return;

    new Structure(
      this.scene,
      data.blocks,
      { x, y: 0, z }
    );
  }
}

window.StructureSystem = StructureSystem;
