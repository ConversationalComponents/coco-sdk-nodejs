const sdk = require("./lib/index");

const conv = new sdk.ComponentSession("namer_vp3", "test");
conv.call("Hola").then(r => console.dir(r));
