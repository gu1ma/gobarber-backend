import User from '../models/user';
import jwt from 'jsonwebtoken';
import auth from '../../config/auth';
import * as Yup from 'yup';

class SessionController {
    async store(req, res){
        const { email, password } = req.body;

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ message: 'validation fails' });
        }

        const user = await User.findOne({ where: { email } });

        if(!user) {
            return res.status(401).json({ message: 'user not found' });
        }

        if(!(await user.checkPassword(password))){
            return res.status(401).json({ message: 'password does not match' });
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email
            },
            token: jwt.sign({ id }, auth.secret, {
                expiresIn: auth.expiresIn,
            })
        })
    }
} 

export default new SessionController();