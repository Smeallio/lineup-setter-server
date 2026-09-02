import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { addManager, getManagerById } from "../controllers/managers.controllers";

const router = Router();

router.route("/").get(requireAuth, getManagerById).post(addManager);

export default router;
