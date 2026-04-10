import { Router } from "express";
import folderController from "../controllers/folderController.js";

const folderRouter = Router();

folderRouter.post("/folders/new", folderController.createFolder);
folderRouter.get("/folders/:id", folderController.renderFolder);

export default folderRouter;
