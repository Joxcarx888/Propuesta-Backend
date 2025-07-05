import { Router } from 'express';
import { createMaterial, getAllMaterials, getMaterialById, updateMaterial, deleteMaterial } from './material.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { tieneRole } from '../middlewares/validar-roles.js';

const router = Router();

router.post(
    '/',
    validarJWT,
    tieneRole('ADMIN', 'TUTOR'),
    createMaterial
);

router.get(
    '/',
    getAllMaterials
);

router.get(
    '/:id',
    getMaterialById
);

router.put(
    '/:id',
    validarJWT,
    tieneRole('ADMIN', 'TUTOR'),
    updateMaterial
);

router.delete(
    '/:id',
    validarJWT,
    tieneRole('ADMIN', 'TUTOR'),
    deleteMaterial
);

export default router;
