import express from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  syncUser,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/sync', syncUser);
router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
