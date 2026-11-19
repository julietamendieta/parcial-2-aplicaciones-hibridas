import {Router} from 'express'
import ServiceController from '../controllers/ServiceController.js'

const router = Router();

const controller = new ServiceController();

router.get('/', controller.getAll);
router.get('/:id', controller.getByName);
router.get('/:serviceid/appointment', controller.getApptbyService);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;