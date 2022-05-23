import { Router } from 'express'
const router = Router()

import PostsController from '../controllers/PostsController'
const {
  createPost,
  getAllUserPosts,
  getAll,
  likes,
  comment,
  getPostById, 
  deletePost,
  getPostsByFollowing
} = PostsController

import checkToken from '../helpers/check-token'
import imageUpload from '../helpers/image-upload'

router.post(
  '/createpost',
  [checkToken, imageUpload.array('images')],
  createPost
)
router.get('/myposts', checkToken, getAllUserPosts)
router.get('/allposts', checkToken, getAll)
router.get('/postById/:id', checkToken, getPostById)
router.put('/:id/like', checkToken, likes)
router.put('/:id/comment', checkToken, comment)
router.delete('/:id', checkToken, deletePost)
router.get('/postsByFollowing', checkToken, getPostsByFollowing)

export default router
