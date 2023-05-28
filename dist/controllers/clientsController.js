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
exports.updateClient = exports.deleteClient = exports.addClient = exports.getClient = exports.getClients = void 0;
const db_1 = require("../db");
const getClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [clients] = yield db_1.pool.query('SELECT * FROM client');
        res.send(clients);
    }
    catch (e) {
        console.error(e);
    }
});
exports.getClients = getClients;
const getClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [client] = yield db_1.pool.query('SELECT * FROM client WHERE id = ?', [id]);
        if (client.length <= 0)
            res.status(404).json({ message: 'Client not found' });
        res.send(client[0]);
    }
    catch (e) {
        console.error(e);
    }
});
exports.getClient = getClient;
const addClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        const [client] = yield db_1.pool.query('INSERT INTO client (name, password) values (?, ?)', [name, password]);
        res.send({
            id: client.insertId,
            name,
            password
        });
    }
    catch (e) {
        console.error(e);
    }
});
exports.addClient = addClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [result] = yield db_1.pool.query('DELETE FROM client WHERE id = ?', [id]);
        if (result.affectedRows <= 0)
            res.status(404).json({ message: 'Client not found' });
        res.sendStatus(204);
    }
    catch (e) {
        console.error(e);
    }
});
exports.deleteClient = deleteClient;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, password } = req.body;
        const [result] = yield db_1.pool.query('UPDATE client SET name = IFNULL(?, name), password = IFNULL(?, password) WHERE id = ?', [name, password, id]);
        if (result.affectedRows === 0)
            res.status(404).json({ message: 'Client not found' });
        const [client] = yield db_1.pool.query('SELECT * FROM client WHERE id = ?', [id]);
        res.json(client[0]);
    }
    catch (e) {
        console.error(e);
    }
});
exports.updateClient = updateClient;
