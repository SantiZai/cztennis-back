"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const clients_routes_1 = __importDefault(require("./routes/clients.routes"));
const strings_routes_1 = __importDefault(require("./routes/strings.routes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/clients', clients_routes_1.default);
app.use('/api/strings', strings_routes_1.default);
app.use((req, res, next) => res.status(404).json({ message: 'Endpoint not found' }));
exports.default = app;
