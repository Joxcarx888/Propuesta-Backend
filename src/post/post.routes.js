import { Router } from 'express';
import {
  createPost,
  getPostsByForum,
  deletePost
} from '../post/post.controller.js';

import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post(
  '/',
  validarJWT,
  createPost
);

router.get(
  '/forum/:forumId',
  validarJWT,
  getPostsByForum
);

router.delete(
  '/:id',
  validarJWT,
  deletePost
);

export default router;
