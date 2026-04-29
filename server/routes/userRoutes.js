import express from "express";
import { getAllUsers, createUser } from "../controllers/userController.js";
import { deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.delete("/:id", deleteUser);
router.get("/", getAllUsers);
router.post("/", createUser);

export default router;