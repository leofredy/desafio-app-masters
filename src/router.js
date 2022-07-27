import { Router } from 'express';
import StatusServerController from './controllers/StatusServerController.js';

const router = Router();

router.get('/', StatusServerController.statusServer);
router.get('/donation', StatusServerController.statusServer);

export default router;
