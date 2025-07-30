import { Router } from 'express';
import { createQuiz, getAllQuizzes, getQuizById, updateQuiz, deleteQuiz, createMRUQuiz, createAreaQuiz, submitQuiz } from '../quiz/quiz.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { tieneRole } from '../middlewares/validar-roles.js';

const router = Router();

router.post(
    '/',
    validarJWT,
    tieneRole('ADMIN', 'TUTOR'),
    createQuiz
);

router.get(
    '/',
    getAllQuizzes
);

router.get(
    '/:id',
    getQuizById
);

router.put(
    '/:id',
    validarJWT,
    tieneRole('ADMIN', 'TUTOR'),
    updateQuiz
);

router.delete(
    '/:id',
    validarJWT,
    tieneRole('ADMIN', 'TUTOR'),
    deleteQuiz
);

router.post(
    '/generate/mru',
    validarJWT,
    tieneRole('ADMIN', 'TUTOR'),
    createMRUQuiz
);


router.post(
    '/generate/area',
    validarJWT,
    tieneRole('ADMIN', 'TUTOR'),
    createAreaQuiz
);

router.post(
  '/:id/submit',
  validarJWT,
  submitQuiz
);


export default router;
