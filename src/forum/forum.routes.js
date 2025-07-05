import { Router } from 'express';
import {
  createForum,
  getAllForums,
  getForumById,
  deleteForum,
  updateForum
} from '../forum/forum.controller.js';

import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post(
  '/',
  validarJWT,
  createForum
);

router.get(
  '/',
  validarJWT,
  getAllForums
);

router.get(
  '/:id',
  validarJWT,
  getForumById
);

router.delete(
  '/:id',
  validarJWT,
  deleteForum
);

router.put(
    '/:id', 
    validarJWT, 
    updateForum
);

export default router;
