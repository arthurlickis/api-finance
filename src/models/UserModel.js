import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

export default class UserModel extends Model {
  static init(sequelize) {
    super.init(
      {
        id_user: {
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
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: true,
          validate: {
            isEmail: {
              msg: "O campo e-mail está inválido",
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 36],
              msg: "O campo senha precisa estar entre 6 a 36 caracteres",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "users",
        freezeTableName: true,
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.TransactionModel, { foreignKey: "id_user", as: "transactions" })
  }
}