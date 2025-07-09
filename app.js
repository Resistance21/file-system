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
    const watcher = (0, promises_1.watch)("./command.txt");
    try {
        for (var _d = true, watcher_1 = __asyncValues(watcher), watcher_1_1; watcher_1_1 = yield watcher_1.next(), _a = watcher_1_1.done, !_a; _d = true) {
            _c = watcher_1_1.value;
            _d = false;
            const event = _c;
            if (event.eventType === "change") {
                console.log(event);
                const commandFileStats = yield commandFileHandler.stat();
                const fileBuffer = Buffer.alloc(commandFileStats.size);
                console.log(commandFileStats.uid, commandFileStats.size);
                const fileContent = yield commandFileHandler.read(fileBuffer, {
                    position: 0,
                });
                console.log(fileContent);
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
