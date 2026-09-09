import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import {
  addManager,
  getCurrentManager,
  managerLogin,
} from "../controllers/managers.controllers";

const router = Router();

router.route("/").get(requireAuth, getCurrentManager).post(addManager);

router.route("/login").post(managerLogin);

export default router;
