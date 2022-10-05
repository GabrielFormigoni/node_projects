const { createReadStream } = require("fs");

const stream = createReadStream("./content/big.txt", {
  highWaterMark: 90000,
});

stream.on("data", (chunk) => console.log(chunk.length));

stream.on("error", (err) => console.log(err));
