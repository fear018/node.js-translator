const fs = require("fs");
const readline = require("readline");
const os = require("os");
const { translate } = require("free-translate");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  crlfDelay: Infinity,
});

const defaultHandler = (err) => {
  if (err) {
    throw new Error(err);
  }
};

if (fs.existsSync("output.txt")) {
  fs.truncate("output.txt", 0, defaultHandler);
}

rl.on("line", async (line) => {
  const data = Buffer.from(line).toString() + os.EOL;
  const options = { flag: "a+" };

  try {
    const enTranslate = await translate(data, { from: "ru", to: "en" });
    fs.writeFile("en.translate.txt", enTranslate, options, defaultHandler);

    const znTranslate = await translate(data, { from: "ru", to: "zh-CN" });
    fs.writeFile("zn.translate.txt", znTranslate, options, defaultHandler);
  } catch (error) {
    console.log("error", error);
  }
});
