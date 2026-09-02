import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import {
  addPlayer,
  deletePlayer,
  getPlayersByManagerId,
} from "../controllers/players.controllers";

const router = Router();

router
  .route("/")
  .get(requireAuth, getPlayersByManagerId)
  .post(requireAuth, addPlayer);

router.route("/:id").delete(requireAuth, deletePlayer);

export default router;
