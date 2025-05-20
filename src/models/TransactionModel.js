import Sequelize, { Model } from "sequelize";

export default class TransactionModel extends Model {
  static init(sequelize) {
    super.init(
      {
        id_transaction: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 100],
              msg: "O campo nome precisa estar entre 3 a 100 caracteres",
            },
          },
        },
        value: {
          type: Sequelize.DECIMAL,
          defaultValue: 0,
        },
        type: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            isIn: {
              args: [['Entrada', 'Saída']],
              msg: "O campo tipo precisa ser 'entrada' ou 'saída'",
            },
          },
        },
        category: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 100],
              msg: "O campo categoria precisa estar entre 3 a 100 caracteres",
            },
          },
        },
        description: {
          type: Sequelize.STRING,
          defaultValue: null,
          allowNull: true,
          validate: {
            isOptional(value) {
              if (value !== null && value !== "" && (value.length < 3 || value.length > 200)) {
                throw new Error("O campo descrição precisa ter entre 3 a 200 caracteres");
              }
            },
          },
        },
        id_user: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id_user",
          },
        },
      },
      {
        sequelize,
        tableName: "transactions",
        freezeTableName: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.UserModel, { foreignKey: "id_user", as: "users" });
  }
}