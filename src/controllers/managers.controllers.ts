import { db } from "../db/knex";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../models/authentication";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateId } from "../utils/generateId";
import { SALT_ROUNDS } from "../utils/constants";

export const addManager = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }
    const existingEmail = await db("managers").where("email", email).first();
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "An account with this email already exists" });
    }
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const publicId = generateId();
    await db("managers").insert({
      id: publicId,
      name,
      email,
      password_hash: passwordHash,
    });

    const token = jwt.sign(
      { managerId: publicId },
      process.env.JWT_SECRET as string,
      { expiresIn: "3d" }
    );

    res.status(201).json({ id: publicId, name, email, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating manager account" });
  }
};

export const managerLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const manager = await db("managers").where("email", email).first();
    if (!manager) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      manager.password_hash
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { managerId: manager.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "3d" }
    );
    res.status(200).json({ id: manager.id, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error logging into account" });
  }
};

export const getCurrentManager = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const manager = await db("managers")
      .where("id", req.managerId)
      .select("id", "name", "email")
      .first();
    if (!manager) {
      return res.status(404).json({ error: "Manager not found" });
    }
    res.status(200).json(manager);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error retrieving manager from the database" });
  }
};
