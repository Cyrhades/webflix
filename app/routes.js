import homeController from '../src/controllers/HomeController.js';
import { get as authControllerGet, post as authControllerPost} from '../src/controllers/AuthController.js';

export default (app) => {
    app.get('/', homeController);

    app.get('/connexion', authControllerGet);
    app.post('/connexion', authControllerPost);
};