class MobSystem {
  constructor(scene) {
    this.mobs = [];
    this.scene = scene;

    MOB_DATA.forEach(data => {
      this.mobs.push(new Mob(data, scene));
    });
  }

  update(player) {
    this.mobs.forEach(mob => {
      mob.update(player.body.position);
    });
  }
}

window.MobSystem = MobSystem;
