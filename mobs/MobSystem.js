class MobSystem {
  constructor(scene) {
    this.scene = scene;
    this.mobs = [];
    this.currentDimension = "overworld";
  }

  setDimension(name) {
    this.mobs.forEach(m => m.destroy());
    this.mobs = [];
    this.currentDimension = name;

    MOB_DATA.forEach(data => {
      if (data.dimensions === "all" || data.dimensions.includes(name)) {
        this.mobs.push(new Mob(data, this.scene));
      }
    });
  }

  update(player, camera) {
    this.mobs.forEach(mob => {
      mob.update(player.body.position, camera);
    });
  }
}

window.MobSystem = MobSystem;
