// @Desc Function to turn input string to object reference

import NavItem from "../models/NavItem.ts"

 const stmodel = (string: string) => {
  switch(string) {
    case "NavItem":
      return NavItem
  }
}

export default stmodel

