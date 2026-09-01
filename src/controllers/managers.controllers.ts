import { Request, Response } from "express";
import { db } from "../db/knex";

export const getManagerById = async (req: Request, res: Response) => {
    try {
        const managers = await db("managers").where("id", req.params.id);
        res.status(200).json(managers);
    } catch (err) {
        res.status(500).send(`Error retrieving managers from the database: ${err}`);
    }
}