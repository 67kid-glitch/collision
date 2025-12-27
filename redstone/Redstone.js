class Redstone {
  constructor() {
    this.powered = false;
  }

  toggle() {
    this.powered = !this.powered;
  }
}

window.Redstone = Redstone;
