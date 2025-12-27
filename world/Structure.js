class Structure {
  constructor(scene, blocks, offset) {
    const geo = new THREE.BoxGeometry(1, 1, 1);

    blocks.forEach(b => {
      const mat = new THREE.MeshLambertMaterial({ color: b.color });
      const block = new THREE.Mesh(geo, mat);
      block.position.set(
        b.x + offset.x,
        b.y + offset.y,
        b.z + offset.z
      );
      scene.add(block);
    });
  }
}

window.Structure = Structure;
