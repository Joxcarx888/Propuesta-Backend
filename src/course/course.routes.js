import { Router } from 'express';
import { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } from '../course/course.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { tieneRole } from '../middlewares/validar-roles.js';

const router = Router();

router.post(
    '/',
    validarJWT,
    tieneRole('ADMIN'),
    createCourse
);

router.get(
    '/',
    getAllCourses
);

router.get(
    '/:id',
    getCourseById
);

router.put(
    '/:id',
    validarJWT,
    tieneRole('ADMIN'),
    updateCourse
);

router.delete(
    '/:id',
    validarJWT,
    tieneRole('ADMIN'),
    deleteCourse
);

export default router;
