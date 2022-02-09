import { Router } from "express";
const router = Router();

import PublicationsController from "../controllers/PublicationsController";
const { createPublication, getAllUserPublications, getAll } = PublicationsController;

router.post("/createpublication", createPublication);
router.get("/mypublications", getAllUserPublications);
router.get("/publications", getAll);

export default router;
