import {Router} from 'express'
import ServiceController from '../controllers/ServiceController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import roleMiddleware from '../middlewares/roleMiddleware.js'

const router = Router();

const controller = new ServiceController();

router.get('/', authMiddleware,controller.getAll);
router.get('/:id', authMiddleware, controller.getByName);
router.get('/:serviceid/appointment', authMiddleware, controller.getApptbyService);
router.post('/', authMiddleware, roleMiddleware, controller.create);
router.put('/:id', authMiddleware, roleMiddleware, controller.update);
router.delete('/:id', authMiddleware, roleMiddleware, controller.delete);

export default router;