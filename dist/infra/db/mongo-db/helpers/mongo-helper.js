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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongohelper = void 0;
const mongodb_1 = require("mongodb");
exports.Mongohelper = {
    client: null,
    uri: null,
    connect(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            this.uri = uri;
            this.client = yield mongodb_1.MongoClient.connect(uri);
            this.client.db(global.__MONGO_DB_NAME__);
        });
    },
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.close();
            this.client = null;
        });
    },
    getCollection(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client) {
                this.client = yield mongodb_1.MongoClient.connect(this.uri);
            }
            return this.client.db().collection(name);
        });
    },
    map: (collection) => {
        if (!collection) {
            return null;
        }
        const { _id } = collection, collectionWithoutId = __rest(collection, ["_id"]);
        return Object.assign({}, collectionWithoutId, { id: _id });
    }
};
