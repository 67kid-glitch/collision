class Player {
  constructor(camera) {
    this.camera = camera;

    this.body = new THREE.Object3D();
    this.body.position.set(0, 5, 5);
    this.body.add(camera);
    camera.position.set(0, 0, 0);

    this.yaw = 0;
    this.pitch = 0;

    this.speed = 0.15;
    this.sensitivity = 0.002;

    // === PHYSICS ===
    this.velocityY = 0;
    this.gravity = -0.02;
    this.jumpStrength = 0.35;
    this.onGround = false;

    this.keys = {};

    window.addEventListener("keydown", e => {
      this.keys[e.key.toLowerCase()] = true;
      if (e.key === " " && this.onGround) {
        this.velocityY = this.jumpStrength;
        this.onGround = false;
      }
    });

    window.addEventListener("keyup", e => {
      this.keys[e.key.toLowerCase()] = false;
    });

    document.addEventListener("mousemove", e => {
      if (!document.pointerLockElement) return;

      this.yaw -= e.movementX * this.sensitivity;
      this.pitch -= e.movementY * this.sensitivity;

      const limit = Math.PI / 2 - 0.01;
      this.pitch = Math.max(-limit, Math.min(limit, this.pitch));

      this.body.rotation.y = this.yaw;
      this.camera.rotation.x = this.pitch;
    });
  }

  addToScene(scene) {
    scene.add(this.body);
  }

  update() {
    // === MOVEMENT ===
    const forward = new THREE.Vector3(
      Math.sin(this.yaw), 0, Math.cos(this.yaw)
    ).negate();

    const right = new THREE.Vector3(
      Math.cos(this.yaw), 0, -Math.sin(this.yaw)
    );

    if (this.keys["w"]) this.body.position.addScaledVector(forward, this.speed);
    if (this.keys["s"]) this.body.position.addScaledVector(forward, -this.speed);
    if (this.keys["a"]) this.body.position.addScaledVector(right, -this.speed);
    if (this.keys["d"]) this.body.position.addScaledVector(right, this.speed);

    // === GRAVITY ===
    this.velocityY += this.gravity;
    this.body.position.y += this.velocityY;

    // === GROUND CHECK (simple but solid) ===
    if (this.body.position.y < 2) {
      this.body.position.y = 2;
      this.velocityY = 0;
      this.onGround = true;
    }
  }
}

window.Player = Player;
