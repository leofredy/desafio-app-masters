import { Router } from 'express';

import errorHandler from './middlewares/errorHandler.js';

import StatusServerController from './controllers/StatusServerController.js';
import CreateDonationController from './controllers/DonationController.js';

const router = Router();

router.get('/', StatusServerController.statusServer);
router.post('/donation', CreateDonationController.create);

router.use(errorHandler);

export default router;
