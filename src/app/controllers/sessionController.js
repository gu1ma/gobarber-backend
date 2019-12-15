import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/user';
import File from '../models/file';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'validation fails' });
    }

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ message: 'user not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'password does not match' });
    }

    const {
      id, name, avatar, provider,
    } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
        provider,
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
