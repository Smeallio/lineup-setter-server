import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import {
  addPosition,
  deletePosition,
  getPositionsByCurrentManager,
} from "../controllers/positions.controllers";

const router = Router();

router
  .route("/")
  .get(requireAuth, getPositionsByCurrentManager)
  .post(requireAuth, addPosition);

router.route("/:id").delete(requireAuth, deletePosition);

export default router;
