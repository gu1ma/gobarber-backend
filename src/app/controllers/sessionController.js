import User from '../models/user';
import jwt from 'jsonwebtoken';
import auth from '../../config/auth';

class SessionController {
    async store(req, res){
        const { email, password } = req.body;

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