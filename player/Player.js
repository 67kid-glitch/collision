class Player {
  constructor(camera) {
    this.camera = camera;
    this.speed = 0.1;
    this.keys = {};

    window.addEventListener("keydown", e => this.keys[e.key] = true);
    window.addEventListener("keyup", e => this.keys[e.key] = false);
  }

  update() {
    if (this.keys["w"]) this.camera.position.z -= this.speed;
    if (this.keys["s"]) this.camera.position.z += this.speed;
    if (this.keys["a"]) this.camera.position.x -= this.speed;
    if (this.keys["d"]) this.camera.position.x += this.speed;
  }
}

window.Player = Player;
