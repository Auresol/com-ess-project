import express from "express";

import * as gamemodeController from "../controllers/gamemodeController.js";
import * as roomController from "../controllers/roomController.js";

const router = express.Router();

router.post("/gamemode", gamemodeController.createGamemode);
router.post("/sentence", gamemodeController.createSentence);

router.post("/room", roomController.createRoom); 
router.get("/room/:id", roomController.getRoom);
router.get("/room", roomController.getRooms);
router.post("/room/:id/join", roomController.joinRoom);
router.delete("/room/:id", roomController.deleteRoom);
router.post("/room/:id/leave", roomController.leaveRoom);

router.post("/room/:id/start", roomController.startRoom);
router.put("/room/:id/update", roomController.updatePlayer);
router.get("/room/:id/state", roomController.getRoomState);


export default router;
