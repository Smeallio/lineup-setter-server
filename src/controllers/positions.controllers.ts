import { db } from "../db/knex";
import { Response } from "express";
import { AuthenticatedRequest } from "../models/authentication";
import { generateId } from "../utils/generateId";

export const getPositionsByCurrentManager = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const positions = await db("positions")
      .select("positions.id", "positions.name")
      .where("manager_id", req.managerId);
    res.status(200).json(positions);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error retrieving positions from the database" });
  }
};

export const addPosition = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { position } = req.body;
    if (!position) {
      return res.status(400).json({ error: "Position name is required" });
    }
    const publicId = generateId();

    await db("positions").insert({
      id: publicId,
      position,
      manager_id: req.managerId,
    });

    const newPosition = await db("positions").where("id", publicId).first();

    res.status(201).json(newPosition);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding position to the database" });
  }
};

export const deletePosition = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const deletedCount = await db("positions")
      .where({ id, manager_id: req.managerId })
      .del();

    if (deletedCount === 0) {
      return res.status(404).json({
        error:
          "Position not found or you do not have permission to delete this player",
      });
    }

    res.status(200).json({ message: "Position deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting position from the database" });
  }
};
