class World {
  constructor(scene) {
    this.scene = scene;
    this.blocks = [];
    this.generate();
  }

  generate() {
    const geo = new THREE.BoxGeometry(1,1,1);

    for (let x = -50; x < 50; x++) {
      for (let z = -50; z < 50; z++) {

        // height map
        const height =
          Math.floor(
            3 +
            Math.sin(x * 0.2) * 2 +
            Math.cos(z * 0.2) * 2 +
            Math.random() * 2
          );

        for (let y = 0; y <= height; y++) {

          // cave chance
          if (y > 1 && Math.random() < 0.08) continue;

          const color =
            y === height ? 0x00aa00 :
            y > height - 3 ? 0x886633 :
            0x777777;

          const mat = new THREE.MeshLambertMaterial({ color });
          const block = new THREE.Mesh(geo, mat);

          block.position.set(x, y, z);
          this.scene.add(block);
          this.blocks.push(block);
        }
      }
    }
  }
}

window.World = World;
