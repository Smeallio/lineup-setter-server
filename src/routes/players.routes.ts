import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import {
  addPlayer,
  getPlayersByManagerId,
} from "../controllers/players.controllers";

const router = Router();

router
  .route("/")
  .get(requireAuth, getPlayersByManagerId)
  .post(requireAuth, addPlayer);

export default router;
