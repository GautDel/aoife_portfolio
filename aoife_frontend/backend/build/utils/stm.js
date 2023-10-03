// @Desc Function to turn input string to object reference
const NavItem = require("../models/NavItem.js");
export const stmodel = (string) => {
    switch (string) {
        case "NavItem":
            return NavItem;
    }
};
