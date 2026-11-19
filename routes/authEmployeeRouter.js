import express from "express";
import AuthEmployeeController from "../controllers/AuthEmployeeController.js";

const router = express.Router();
const controller = new AuthEmployeeController();

router.post('/register', controller.register);
router.post('/login', controller.login);

export default router;