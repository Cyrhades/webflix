import bcrypt from 'bcryptjs';
import { selectByUsername } from "../repository/User.js";

export function get(req, res) {
    res.render('auth');
}

export function post(req, res) {
    let error;
    selectByUsername(req.body.usename).then((user) => {
        if(user !== null) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                console.log(`Youhou les infos de connexion sont correctes, on va maintenir la connexion avec un JWT`)
            } else {
                error = `Echec d'identification.`
            }
        } else {
            error = `Auncun compte n'existe avec cet identifiant.`
        }
        res.render('auth', { error });
    })
}
