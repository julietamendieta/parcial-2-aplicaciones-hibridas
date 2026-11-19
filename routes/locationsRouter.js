import {Router} from 'express'
import LocationController from '../controllers/LocationController.js'

const router = Router();

const controller = new LocationController();

router.get('/', controller.getAll);
router.get('/:id', controller.getByName);
router.get('/:locationid/appointment', controller.getApptbyLocation);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;