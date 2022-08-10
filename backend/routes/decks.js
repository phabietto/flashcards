import { Router } from "express";
import { getAllDecks } from "../controllers/decks.js";

const router = Router();

router.get('/', getAllDecks);

export default router;