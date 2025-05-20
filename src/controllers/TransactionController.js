import TransactionModel from "../models/TransactionModel.js";
import { Op } from "sequelize";

class TransactionController {
    async store(req, res) {
        console.log(req.userId)
        try {
            const newTransaction = await TransactionModel.create({
                ...req.body,
                id_user: req.userId,
            });
            return res.json(newTransaction);

        } catch (e) {
            if (e.errors && Array.isArray(e.errors)) {
                return res.status(400).json({
                    errors: e.errors.map((err) => err.message),
                });
            }
        }
    }

    async index(req, res) {
        try {
            const { type, category, month } = req.query;

            const where = {};
            if (type) where.type = type;
            if (category) where.category = category;
            
            if (month) {
                const startDate = new Date(`${month}-01T00:00:00.000Z`);
                const endDate = new Date(startDate);
                endDate.setMonth(endDate.getMonth() + 1);

                where.updatedAt = {
                    [Op.between]: [startDate, endDate],
                };
            }

            const transactions = await TransactionModel.findAll({ where });
            
            if (!transactions || transactions.length === 0) {
                return res.status(400).json({
                    errors: ["Não foi encontrado uma transação"],
                })
            }

            return res.json(transactions);

        } catch (e) {
            if (e.errors && Array.isArray(e.errors)) {
                return res.status(400).json({
                    errors: e.errors.map((err) => err.message),
                });
            }
        }
    }


    async show(req, res) {
        try {
            const transaction = await TransactionModel.findByPk(req.params.id);

            if (!transaction) {
                return res.status(400).json({
                    errors: ["Transação não foi encotrada"],
                });
            }

            return res.json(transaction);

        } catch (e) {
           if (e.errors && Array.isArray(e.errors)) {
                return res.status(400).json({
                    errors: e.errors.map((err) => err.message),
                });
            }
        }
    }

    async update(req, res) {
        try {
            const transaction = await TransactionModel.findByPk(req.params.id);

            if (!transaction) {
                return res.status(400).json({
                    errors: ["Transação não foi encotrada"],
                });
            }

            const editTransaction = await transaction.update(req.body);
            return res.json(editTransaction);

        } catch (e) {
            if (e.errors && Array.isArray(e.errors)) {
                return res.status(400).json({
                    errors: e.errors.map((err) => err.message),
                });
            }
        }
    }

    async delete(req, res) {
        try {
            const transaction = await TransactionModel.findByPk(req.params.id);

            if (!transaction) {
                return res.status(400).json({
                    errors: ["Transação não foi encotrada"],
                });
            }

            await transaction.destroy();
            
            return res.json("Transação deletada")

        } catch (e) {
            if (e.errors && Array.isArray(e.errors)) {
                return res.status(400).json({
                    errors: e.errors.map((err) => err.message),
                });
            }
        }
    }
}

export default new TransactionController();