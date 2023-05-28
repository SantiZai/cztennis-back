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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateString = exports.deleteString = exports.addString = exports.getString = exports.getStrings = void 0;
const db_1 = require("../db");
const getStrings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [strings] = yield db_1.pool.query('SELECT * FROM string');
        res.send(strings);
    }
    catch (e) {
        console.error(e);
    }
});
exports.getStrings = getStrings;
const getString = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [string] = yield db_1.pool.query('SELECT * FROM string WHERE id = ?', [id]);
        if (string.length <= 0)
            res.status(404).json({ messsage: 'String not found' });
        res.send(string[0]);
    }
    catch (e) {
        console.error(e);
    }
});
exports.getString = getString;
const addString = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, brand, price, size } = req.body;
        const [string] = yield db_1.pool.query('INSERT INTO string (name, brand, price, size) VALUES (?, ?, ?, ?)', [name, brand, price, size]);
        res.send({
            id: string.insertId,
            name,
            brand,
            price,
            size
        });
    }
    catch (e) {
        console.error(e);
    }
});
exports.addString = addString;
const deleteString = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [result] = yield db_1.pool.query('DELETE FROM string WHERE id = ?', [id]);
        if (result.affectedRows <= 0)
            res.status(404).json({ message: 'String not found' });
        res.sendStatus(204);
    }
    catch (e) {
        console.error(e);
    }
});
exports.deleteString = deleteString;
const updateString = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, brand, price, size } = req.body;
        const [result] = yield db_1.pool.query('UPDATE string SET name = IFNULL(?, name), brand = IFNULL(?, brand), price = IFNULL(?, price), size = IFNULL(?, size) WHERE id = ?', [name, brand, price, size, id]);
        if (result.affectedRows === 0)
            res.status(404).json({ message: 'String not found' });
        const [string] = yield db_1.pool.query('SELECT * FROM string WHERE id = ?', [id]);
        res.json(string[0]);
    }
    catch (e) {
        console.error(e);
    }
});
exports.updateString = updateString;
