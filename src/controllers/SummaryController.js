import { Sequelize, Op } from "sequelize";
import TransactionModel from "../models/TransactionModel.js";

class SummaryController {
    async index(req, res) {
        try {
            const totals = await TransactionModel.findAll({
                attributes: [
                "type",
                [Sequelize.fn("COUNT", Sequelize.col("id_transaction")), "count"],
                [Sequelize.fn("SUM", Sequelize.col("value")), "total"],
                ],
                group: ["type"],
            });

            if (!totals) {
                return res.status(400).json({
                    errors: ["Transação não foi encontrada, não é possível realizar o resumo"],
                });
            }

            const summary = totals.reduce((acc, cur) => {
                acc[cur.type] = {
                    count: parseInt(cur.dataValues.count, 10),
                    total: parseFloat(cur.dataValues.total),
                };
                return acc;
            }, {});

            const currentBalance = (summary["Entrada"]?.total || 0) - (summary["Saída"]?.total || 0);

            const maxExpense = await TransactionModel.findOne({
                where: { type: "Saída" },
                order: [["value", "DESC"]],
                attributes: ["value", "name", "category", "created_at", "updated_at"],
            });

            const maxIncome = await TransactionModel.findOne({
                where: { type: "Entrada" },
                order: [["value", "DESC"]],
                attributes: ["value", "name", "category", "created_at", "updated_at"],
            });

            const response = {
                summary,
                currentBalance,
                maxIncome,
                maxExpense
            };

            return res.json(response);
        } catch (e) {
            if (e.errors && Array.isArray(e.errors)) {
                return res.status(400).json({
                errors: e.errors.map((err) => err.message),
                });
            }
        }
    }
}

export default new SummaryController();