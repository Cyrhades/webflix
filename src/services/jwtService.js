import jwt  from 'jsonwebtoken';
import Cookies from "cookies";


export function userExists(req, res, next) {
    // Récupération du token dans le cookie
    let token = new Cookies(req,res).get('jwt');
    // Si le cookie (jwt) n'existe pas
    if (token == null) req.user = null;
    jwt.verify(token, process.env.JWT_SECRET, (err, dataJwt) => { 
        // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
        if(err) req.user = null;
        else {
            req.user = dataJwt.username;
            res.locals.username = req.user;
        }
    });

    next();
}

export function controlJWT(req, res, next) {
    // Récupération du token dans le cookie
    let token = new Cookies(req,res).get('jwt');
    // Si le cookie (jwt) n'existe pas
    if (token == null) return res.sendStatus(401);

    // sinon on vérifie le jwt
    jwt.verify(token, process.env.JWT_SECRET, (err, dataJwt) => { 
        // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
        if(err) return res.sendStatus(403);
        
        req.user = dataJwt.username;
    });
    next();
}