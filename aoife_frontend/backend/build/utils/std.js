// @desc Function to turn input string to object reference
import * as fs from "fs";
const df = (input) => {
    const data = JSON.parse(fs.readFileSync(`${__dirname}/../_data/${input}.json`, "utf-8"));
    return data;
};
const navitems = JSON.parse(fs.readFileSync(`${__dirname}/../_data/navItems.json`, 'utf-8'));
export const stdata = (string) => {
    switch (string) {
        case "navitems":
            return navitems;
    }
};
