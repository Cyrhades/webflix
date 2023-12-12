import homeController from '../src/controllers/HomeController.js';
import { get as authControllerGet, post as authControllerPost, authControllerDeconnect} from '../src/controllers/AuthController.js';
import adminController from '../src/controllers/AdminController.js';
import {userExists, controlJWT} from '../src/services/jwtService.js';


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
};
