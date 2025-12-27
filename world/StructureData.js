window.STRUCTURES = {
  trialChamber: {
    dimension: "overworld",
    blocks: [
      { x:0,y:0,z:0,color:0x777777 },
      { x:1,y:0,z:0,color:0x777777 },
      { x:0,y:1,z:0,color:0x999999 }
    ]
  },

  woodlandMansion: {
    dimension: "overworld",
    blocks: Array.from({length:20}, (_,i)=>({
      x:i%5,y:0,z:Math.floor(i/5),color:0x4b3621
    }))
  },

  fortress: {
    dimension: "nether",
    blocks: Array.from({length:15},(_,i)=>({
      x:i%3,y:0,z:Math.floor(i/3),color:0x552222
    }))
  },

  bastion: {
    dimension: "nether",
    blocks: Array.from({length:25},(_,i)=>({
      x:i%5,y:0,z:Math.floor(i/5),color:0x333333
    }))
  }
};
