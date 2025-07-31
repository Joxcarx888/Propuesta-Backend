import { Router } from 'express';
import {
  createComment,
  getCommentsByForum,
  updateComment,
  deleteComment
} from './comment.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { isCommentOwner } from '../middlewares/is-comment-owner.js';

const router = Router();

router.post('/:forumId', validarJWT, createComment);
router.get('/:forumId', getCommentsByForum);

router.put('/edit/:id', [validarJWT, isCommentOwner], updateComment);
router.delete('/delete/:id', [validarJWT, isCommentOwner], deleteComment);

export default router;
