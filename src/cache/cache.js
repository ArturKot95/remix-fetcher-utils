"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
var LRUCache_1 = require("./LRUCache");
var cache = new LRUCache_1.LRUCache(1000);
exports.cache = cache;
