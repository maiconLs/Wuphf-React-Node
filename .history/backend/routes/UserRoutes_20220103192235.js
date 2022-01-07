import { Router } from 'express'
const router = Router()

import UserController from '../controllers/UserController.js';
const { register, login } = UserController

import checkToken from '../helpers/check-token'


router.post('/register', register)
router.post('/login', login)

export default router