import { Router } from 'express';
import {
  createProgress,
  getAllProgress,
  getProgressById,
  updateProgress,
  deleteProgress,
  getUserProgressSummary
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
  '/user/:userId/summary',
  validarJWT,
  getUserProgressSummary
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
