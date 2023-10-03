import * as fs from "node:fs";
const df = (input) => {
    const data = JSON.parse(fs.readFileSync(`${__dirname}/../_data/${input}.json`, "utf-8"));
    return data;
};
module.exports = df;
