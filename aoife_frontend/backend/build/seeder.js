var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require('fs');
import { stmodel } from "./utils/stm.js";
const std = require("./utils/std.ts");
const df = require("./utils/df.ts");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Load env variables
dotenv.config({ path: './config/.env' });
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
});
const importData = (model, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield stmodel(model).create(df(data));
        console.log(`Data added: ${JSON.stringify(std(data))}`);
        process.exit();
    }
    catch (error) {
        console.error(error);
    }
});
const deleteData = (model) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield stmodel(model).deleteMany();
        console.log(`Deleting everything from ${model}`);
        process.exit();
    }
    catch (error) {
        console.error(error);
    }
});
if (process.argv[2] === '-i') {
    importData(process.argv[3], process.argv[4]);
}
else if (process.argv[2] === '-d') {
    deleteData(process.argv[3]);
}
