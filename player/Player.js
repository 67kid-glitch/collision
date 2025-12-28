class Player {
  constructor(camera) {
    this.camera = camera;

    this.pitch = 0;
    this.yaw = 0;

    this.speed = 0.15;
    this.sensitivity = 0.002;

    this.keys = {};

    this.camera.position.set(0, 5, 10);

    document.addEventListener("keydown", e => this.keys[e.code] = true);
    document.addEventListener("keyup", e => this.keys[e.code] = false);

    document.addEventListener("mousemove", e => {
      if (document.pointerLockElement !== document.body) return;

      this.yaw   -= e.movementX * this.sensitivity;
      this.pitch -= e.movementY * this.sensitivity;

      const limit = Math.PI / 2;
      this.pitch = Math.max(-limit, Math.min(limit, this.pitch));
    });
  }

  update() {
    this.camera.rotation.set(this.pitch, this.yaw, 0);

    const forward = new THREE.Vector3(
      Math.sin(this.yaw),
      0,
      Math.cos(this.yaw)
    );

    const right = new THREE.Vector3(
      Math.cos(this.yaw),
      0,
      -Math.sin(this.yaw)
    );

    if (this.keys["KeyW"]) this.camera.position.addScaledVector(forward, this.speed);
    if (this.keys["KeyS"]) this.camera.position.addScaledVector(forward, -this.speed);
    if (this.keys["KeyA"]) this.camera.position.addScaledVector(right, -this.speed);
    if (this.keys["KeyD"]) this.camera.position.addScaledVector(right, this.speed);
  }
}

window.Player = Player;
