import { db } from "../db/knex";
import { Response } from "express";
import { AuthenticatedRequest } from "../models/authentication";
import { generateId } from "../utils/generateId";

export const getPlayersByCurrentManager = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const players = await db("players").where("manager_id", req.managerId);
    res.status(200).json(players);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error retrieving players from the database" });
  }
};

export const addPlayer = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Player name is required" });
    }
    const publicId = generateId();

    await db("players").insert({
      id: publicId,
      name,
      manager_id: req.managerId,
    });

    const newPlayer = await db("players").where("id", publicId).first();

    res.status(201).json(newPlayer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding player to the database" });
  }
};

export const deletePlayer = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const deletedCount = await db("players")
      .where({ id, manager_id: req.managerId })
      .del();

    if (deletedCount === 0) {
      return res
        .status(404)
        .json({
          error:
            "Player not found or you do not have permission to delete this player",
        });
    }

    res.status(200).json({ message: "Player deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting player from the database" });
  }
};
