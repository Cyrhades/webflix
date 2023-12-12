import homeController from '../src/controllers/HomeController.js';
import { get as authControllerGet, post as authControllerPost} from '../src/controllers/AuthController.js';
import adminController from '../src/controllers/AdminController.js';
import controlJwt from '../src/services/jwtService.js';


export default (app) => {
    /**
     * Gérer le JWT pour toutes les urls commencant par /admin
     */
    app.use('/admin', controlJwt);


    app.get('/', homeController);

    app.get('/connexion', authControllerGet);
    app.post('/connexion', authControllerPost);

    
    app.get('/admin', adminController)
    app.get('/admin/toto', adminController)
};
