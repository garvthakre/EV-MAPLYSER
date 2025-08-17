import express from "express";
import { CreateStations, GetStations, GetStationsById } from "../controllers/stations.js";
import {authMiddleware} from "../middleware/authmiddleware.js"
const router = express.Router();
router.post("/createstation",authMiddleware,CreateStations);
router.get("/getstations",GetStations);
router.get("/getstationsById/:id",GetStationsById);

export default router;