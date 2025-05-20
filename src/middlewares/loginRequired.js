import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization)

  if (!authorization) {
    return res.status(401).json({
      errors: ['Precisa fazer login'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { email } = data;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }

    req.userId = user.id_user;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
