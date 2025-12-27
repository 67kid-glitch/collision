class World {
  constructor(scene) {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshLambertMaterial({ color: 0x55aa55 });

    for (let x = -10; x <= 10; x++) {
      for (let z = -10; z <= 10; z++) {
        const block = new THREE.Mesh(geo, mat);
        block.position.set(x, 0, z);
        scene.add(block);
      }
    }
  }
}

window.World = World;
