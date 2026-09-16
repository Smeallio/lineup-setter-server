import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

import playerRoutes from "./routes/players.routes";
import positionRoutes from "./routes/positions.routes";
import managerRoutes from "./routes/managers.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/players", playerRoutes);
app.use("/positions", positionRoutes);
app.use("/managers", managerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
