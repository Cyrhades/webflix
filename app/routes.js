import homeController from '../src/controllers/HomeController.js';
import { get as authControllerGet, post as authControllerPost, authControllerDeconnect} from '../src/controllers/AuthController.js';
import adminController from '../src/controllers/AdminController.js';
import {userExists, controlJWT} from '../src/services/jwtService.js';

import QRCode from 'qrcode';
import { authenticator }from 'otplib';

export default (app) => {
    app.use('/', userExists);

    /**
     * Gérer le JWT pour toutes les urls commencant par /admin
     */
    app.use('/admin', controlJWT);


    app.get('/', homeController);

    app.get('/connexion', authControllerGet);
    app.post('/connexion', authControllerPost);
    app.get('/deconnexion', authControllerDeconnect);
    
    app.get('/admin', adminController)
    app.get('/admin/toto', adminController)

    app.get('/profil', (req, res) => {
        
        QRCode.toDataURL(authenticator.keyuri(req.user, 'WebFlix', process.env.A2F_SECRET), (err, url) => {
            if (err) res.redirect('/');
            res.render('2fa-qrcode', { 
                qr: url, 
                account: `WebFlix`,
                key: process.env.A2F_SECRET
            });

        }); 
    });
        
    app.get('/2fa-valid', (req, res) => { 
        if(req.session.a2f != undefined && req.session.a2f) {
            return res.redirect('/admin')
        }
        res.render('2fa-form'); 
    });
    app.post('/2fa-valid', (req, res) => {
        try {
            const isValid = authenticator.check(req.body.number_2fa, process.env.A2F_SECRET);
            // si c'est valide, on peut connecter l'utilisateur
            if(isValid) {
                req.session.a2f = true;
                res.redirect('/admin')
            } else {
                // si non valide, recharger la page du formulaire 2FA
                res.render('2fa-form', {statut: 'error'});
            }
        } catch (err) {
            res.render('2fa-form', {statut: 'error'});
        }
    });
};
