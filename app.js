"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
//const fs = require('fs');
const promises_1 = require("node:fs/promises");
const fileWatch = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const commandFileHandler = yield (0, promises_1.open)("./command.txt", "r");
    const createFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, promises_1.appendFile)(path, "", { flag: "ax" });
            console.log("file created");
        }
        catch (e) {
            console.log("file exsists");
        }
    });
    const deleteFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, promises_1.unlink)(path);
            console.log("file deleted");
        }
        catch (e) {
            if (e instanceof Error)
                console.log("error", e.message);
        }
    });
    const renameFile = (oldpath, newpath) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, promises_1.rename)(oldpath, newpath);
            console.log("file renamed");
        }
        catch (e) {
            if (e instanceof Error)
                console.log("error", e.message);
        }
    });
    const addToFile = (path, content) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, promises_1.appendFile)(path, content);
            console.log("file appended");
        }
        catch (e) {
            if (e instanceof Error)
                console.log("error", e.message);
        }
    });
    commandFileHandler.on("change", () => __awaiter(void 0, void 0, void 0, function* () {
        const commandFileStats = yield commandFileHandler.stat();
        const fileBuffer = Buffer.alloc(commandFileStats.size);
        const fileContent = yield commandFileHandler.read(fileBuffer, {
            position: 0,
        });
        const fileText = fileContent.buffer.toString();
        const FILEOPTIONS = {
            CRATE: "create a file",
            DELETE: "delete file",
            RENAME: "rename file",
            ADDTOFILE: "add to file",
        };
        if (fileText.includes(FILEOPTIONS.CRATE)) {
            createFile(fileText.substring(FILEOPTIONS.CRATE.length + 1));
        }
        if (fileText.includes(FILEOPTIONS.DELETE)) {
            deleteFile(fileText.substring(FILEOPTIONS.DELETE.length + 1));
        }
        if (fileText.includes(FILEOPTIONS.RENAME)) {
            const toIndex = fileText.indexOf(" to ");
            const oldPath = fileText.substring(FILEOPTIONS.RENAME.length + 1, toIndex);
            const newPath = fileText.substring(toIndex + 4);
            renameFile(oldPath, newPath);
        }
        if (fileText.includes(FILEOPTIONS.ADDTOFILE)) {
            const contentInx = fileText.indexOf(" add ");
            addToFile(fileText.substring(FILEOPTIONS.ADDTOFILE.length + 1, contentInx), fileText.substring(contentInx + 4));
        }
        console.log(fileContent.buffer.toString());
    }));
    const watcher = (0, promises_1.watch)("./command.txt");
    try {
        for (var _d = true, watcher_1 = __asyncValues(watcher), watcher_1_1; watcher_1_1 = yield watcher_1.next(), _a = watcher_1_1.done, !_a; _d = true) {
            _c = watcher_1_1.value;
            _d = false;
            const event = _c;
            if (event.eventType === "change") {
                commandFileHandler.emit("change");
                //console.log("event", event);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = watcher_1.return)) yield _b.call(watcher_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    yield commandFileHandler.close();
});
fileWatch();
