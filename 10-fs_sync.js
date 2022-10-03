const { readFileSync, writeFileSync } = require("fs");

const first = readFileSync("./content/sub1/firstText.txt", "utf-8");
const second = readFileSync("./content/sub1/secondText.txt", "utf-8");

console.log(`${first}\n${second}`);

writeFileSync(
  "./content/sub1/result-sync.txt",
  `O resultado da concatenação é:\n${first}\n${second}`,
  { flag: "a" }
);
