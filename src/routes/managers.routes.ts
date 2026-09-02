import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { getManagerById } from "../controllers/managers.controllers";

const router = Router();

router.route("/").get(requireAuth, getManagerById);

export default router;
