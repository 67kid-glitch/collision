class Mob {
  constructor(data, scene) {
    this.name = data.name;
    this.type = data.type;
    this.health = data.health;
    this.speed = data.speed;
    this.hostile = data.hostile;

    const geo = new THREE.BoxGeometry(0.9, 1.8, 0.9);
    const mat = new THREE.MeshLambertMaterial({ color: data.color });
    this.mesh = new THREE.Mesh(geo, mat);

    this.mesh.position.set(
      Math.random() * 20 - 10,
      1,
      Math.random() * 20 - 10
    );

    scene.add(this.mesh);
  }

  update(playerPos) {
    const dist = this.mesh.position.distanceTo(playerPos);

    if (this.hostile && dist < 10) {
      const dir = playerPos.clone().sub(this.mesh.position).normalize();
      this.mesh.position.addScaledVector(dir, this.speed);
    }
  }
}

window.Mob = Mob;
