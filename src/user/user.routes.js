import { Router } from 'express';
import { changeUserRole , getUsers } from './user.controller.js';

const router = Router();

router.put('/change-role/:uid', changeUserRole);

router.get('/', getUsers);

export default router;
