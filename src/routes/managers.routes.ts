import { Router } from 'express';
import { getManagerById } from '../controllers/managers.controllers';

const router = Router();

router.get('/:managerId', getManagerById);

export default router;