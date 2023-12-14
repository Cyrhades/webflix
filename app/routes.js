import homeController from '../src/controllers/HomeController.js';
import { get as authControllerGet, post as authControllerPost, authControllerDeconnect} from '../src/controllers/AuthController.js';
import * as adminController from '../src/controllers/AdminController.js';
import {userExists, controlJWT} from '../src/services/jwtService.js';
import * as a2f from '../src/services/a2fService.js';

export default (app) => {
    app.use('/', userExists);

    /**
     * Gérer le JWT pour toutes les urls commencant par /admin
     */
    app.use('/admin', controlJWT);

    /** A2F **/
    app.get('/profil', a2f.enable);
    app.get('/2fa-valid', a2f.form);
    app.post('/2fa-valid', a2f.valid);


    app.get('/', homeController);

    app.get('/connexion', authControllerGet);
    app.post('/connexion', authControllerPost);
    app.get('/deconnexion', authControllerDeconnect);
    
    app.get('/admin', adminController.searchMovie)
    app.get('/admin/movie/:id', adminController.saveMovie)
};
