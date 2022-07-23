import { Router } from "express";

const router = Router();

import StatusServerController from "./controllers/StatusServerController.js";

router.get("/", StatusServerController.statusServer);

export default router;