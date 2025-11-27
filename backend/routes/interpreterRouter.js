import express from "express";
import * as InterpreterController from "../controllers/interpreterController.js";
const router = express.Router();

router.get("/", InterpreterController.getAllInterpreters);
router.post("/", InterpreterController.addInterpreter);

router.get("/:id", InterpreterController.getInterpreter);
router.patch("/:id", InterpreterController.updateInterpreter);
router.delete("/:id", InterpreterController.deleteInterpreter);

export default router;
