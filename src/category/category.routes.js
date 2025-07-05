import { Router } from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../category/category.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { tieneRole } from '../middlewares/validar-roles.js';

const router = Router();

router.post(
    '/', 
    validarJWT,
    tieneRole('ADMIN'),
    createCategory
);

router.get(
    '/', 
    getAllCategories
);

router.get(
    '/:id', 
    getCategoryById
);

router.put(
    '/:id', 
    validarJWT,
    tieneRole('ADMIN'),
    updateCategory
);

router.delete(
    '/:id', 
    validarJWT,
    tieneRole('ADMIN'),
    deleteCategory
);

export default router;
