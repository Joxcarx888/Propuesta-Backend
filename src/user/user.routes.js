import { Router } from 'express';
import { changeUserRole } from './user.controller.js';

const router = Router();

router.put('/change-role/:uid', changeUserRole);

export default router;
