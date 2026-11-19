import {Router} from 'express'
import LocationController from '../controllers/LocationController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import roleMiddleware from '../middlewares/roleMiddleware.js'

const router = Router();

const controller = new LocationController();

router.get('/', authMiddleware, controller.getAll);
router.get('/:id', authMiddleware, controller.getByName);
router.get('/:locationid/appointment', authMiddleware, controller.getApptbyLocation);
router.post('/', authMiddleware, roleMiddleware, controller.create);
router.put('/:id', authMiddleware, roleMiddleware, controller.update);
router.delete('/:id', authMiddleware, roleMiddleware, controller.delete);

export default router;