import Sequelize from "sequelize";
import dataBaseConfig from "../config/database.js";

import UserModel from "../models/UserModel.js";
import TransactionModel from "../models/TransactionModel.js";

const models = [UserModel, TransactionModel];

const connection = new Sequelize(dataBaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));


export default connection;