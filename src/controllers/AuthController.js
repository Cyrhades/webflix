import bcrypt from 'bcryptjs';
import { selectByUsername } from "../repository/User.js";
import jwt  from 'jsonwebtoken';
import Cookies from "cookies";

export function get(req, res) {
    res.render('auth');
}

export function post(req, res) {
    let error;
    selectByUsername(req.body.usename).then((user) => {
        if(user !== null) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                let accessToken = jwt.sign({username: user.username}, process.env.JWT_SECRET, {expiresIn: 604800});       
                new Cookies(req,res).set('jwt', accessToken, {httpOnly: true, secure: (process.env.APP_ENV === 'production') });

                req.flash('notify', 'Vous êtes maintenant connecté');
                return res.redirect('/admin');
            } else {
                error = `Echec d'identification.`
            }
        } else {
            error = `Auncun compte n'existe avec cet identifiant.`
        }
        res.render('auth', { error });
    })
}
