import {Router} from 'express'
import EmployeeController from '../controllers/EmployeeController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import roleMiddleware from '../middlewares/roleMiddleware.js'
import uploadMiddleware from '../middlewares/uploadMiddleware.js'

const router = Router();

const controller = new EmployeeController();

router.get('/', authMiddleware, roleMiddleware, controller.getAll);
router.get('/:id', authMiddleware, roleMiddleware, controller.getById);
router.get('/:employeeid/appointment', authMiddleware, roleMiddleware, controller.getApptbyEmployee);
router.post('/', authMiddleware, roleMiddleware, controller.create);
router.put('/:id', authMiddleware, roleMiddleware, controller.update);
router.delete('/:id', authMiddleware, roleMiddleware, controller.delete);

router.post('/profileimage', authMiddleware, uploadMiddleware.single('profileImage'), controller.uploadImage);

export default router;