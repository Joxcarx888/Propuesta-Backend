import { Router } from 'express';
import {
  createProgress,
  getAllProgress,
  getProgressById,
  updateProgress,
  deleteProgress
} from '../progress/progress.controller.js';

import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post(
  '/',
  validarJWT,
  createProgress
);

router.get(
  '/',
  validarJWT,
  getAllProgress
);

router.get(
  '/:id',
  validarJWT,
  getProgressById
);

router.put(
  '/:id',
  validarJWT,
  updateProgress
);

router.delete(
  '/:id',
  validarJWT,
  deleteProgress
);

export default router;
