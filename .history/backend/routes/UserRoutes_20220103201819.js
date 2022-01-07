import { Router } from 'express'
const router = Router()

import UserController from '../controllers/UserController.js';
const { register, login, checkUser, editUser } = UserController

import checkToken from '../helpers/check-token'
import imageUpload from '../helpers/image-upload';

router.post('/register', register)
router.post('/login', login)
router.get('/checkuser', checkUser)
router.post('/edit/:id',checkToken, imageUpload.single("image"), editUser)

export default router