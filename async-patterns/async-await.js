const { readFile, writeFile } = require("fs").promises;
// const util = require("util");
// const readFilepromise = util.promisify(readFile);
// const writeFilepromise = util.promisify(writeFile);

const start = async () => {
  try {
    const first = await readFile("./content/sub1/firstText.txt", "utf-8");
    const second = await readFile("./content/sub1/secondText.txt", "utf-8");
    await writeFile(
      "./content/sub1/resul-async_await.txt",
      `Resultado: ${first} ${second}`,
      { flag: "a" }
    );
    console.log(first, second);
  } catch (error) {
    console.log(error);
  }
};

start();
