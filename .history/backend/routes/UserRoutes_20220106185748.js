import { Router } from 'express'
const router = Router()

import UserController from '../controllers/UserController.js';
const { register, login, checkUser, editUser } = UserController

import checkToken from '../helpers/check-token.js'
import imageUpload from '../helpers/image-upload.js';

router.post('/register', register)
router.post('/login', login)
router.get('/checkuser', checkUser)
router.patch('/edit/:id', checkToken, imageUpload.single("image"), editUser)

export default router