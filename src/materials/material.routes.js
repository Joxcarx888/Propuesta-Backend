import { Router } from 'express';
import {
  crearMaterial,
  editarMaterial,
  eliminarMaterial,
  listarMateriales,
  buscarMateriales,
} from './material.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post('/', validarJWT, crearMaterial);
router.put('/:materialId', validarJWT, editarMaterial);
router.delete('/:materialId', validarJWT, eliminarMaterial);
router.get('/', listarMateriales);
router.get('/buscar', buscarMateriales);

export default router;
