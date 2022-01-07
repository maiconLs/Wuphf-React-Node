import { Router } from 'express'
const router = Router()

import UserController from '../controllers/UserController.js';
const { register } = UserController

router.post('/register', register)

export default router