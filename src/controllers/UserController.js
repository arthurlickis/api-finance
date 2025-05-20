import UserModel from "../models/UserModel.js";

class userController {
  async store(req, res) {
    try {
      const user = await UserModel.create(req.body);
      const { id, name, email } = user;

      return res.json({ id, name, email });

    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({
          errors: ["Já existe um usuário com este e-mail"],
        });
      }

      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
    }
  }

  async update(req, res) {
    try {
      const user = await UserModel.findByPk(req.params.id);
      
      if (!user) {
          return res.status(400).json({
              errors: ["Usuário não foi encotrado"],
          });
      }

      const editUser = await UserModel.update(req.body);
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
      const user = await UserModel.findByPk(req.params.id);

      if (!user) {
          return res.status(400).json({
              errors: ["Usuário não foi encotrado"],
          });
      }

      await user.destroy();
      
      return res.json("Usuário deletado")

    } catch (e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
    }
  }
}

export default new userController();