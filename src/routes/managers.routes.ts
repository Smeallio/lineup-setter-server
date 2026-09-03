import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import {
  addManager,
  getCurrentManager,
} from "../controllers/managers.controllers";

const router = Router();

router.route("/").get(requireAuth, getCurrentManager).post(addManager);

export default router;
