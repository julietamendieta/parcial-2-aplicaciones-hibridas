import {Router} from 'express'
import AppointmentController from '../controllers/AppointmentController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router();

const controller = new AppointmentController();

router.get('/', authMiddleware, controller.getAll);
router.get('/:id', authMiddleware, controller.getById);
router.post('/', authMiddleware, controller.create);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);

export default router;