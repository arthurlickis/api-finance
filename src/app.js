import dotenv from "dotenv";

dotenv.config();

import database from "./database/index.js";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./routes/userRoutes.js";
import TokenRoutes from "./routes/tokenRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    };

    middlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json())
    };

    routes() {
        this.app.use("/register", userRoutes);
        this.app.use("/login", TokenRoutes);
        this.app.use("/transaction", transactionRoutes);
        this.app.use("/summary", summaryRoutes);
    };
};

export default new App().app;