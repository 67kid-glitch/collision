class Spawner {
  constructor(scene, mobName, x, z) {
    this.scene = scene;
    this.mobName = mobName;
    this.position = new THREE.Vector3(x,1,z);
    this.cooldown = 0;

    const geo = new THREE.BoxGeometry(1,1,1);
    const mat = new THREE.MeshLambertMaterial({ color: 0x000000 });
    this.block = new THREE.Mesh(geo, mat);
    this.block.position.copy(this.position);
    scene.add(this.block);
  }

  update(mobSystem) {
    this.cooldown--;
    if (this.cooldown <= 0) {
      mobSystem.spawnMob(this.mobName, this.position);
      this.cooldown = 300;
    }
  }
}

window.Spawner = Spawner;
