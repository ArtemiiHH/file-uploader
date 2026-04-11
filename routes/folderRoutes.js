import { Router } from "express";
import folderController from "../controllers/folderController.js";

const folderRouter = Router();

// Create folder (ROOT)
folderRouter.post("/folders/new", folderController.createFolder);

// Render inside a folder
folderRouter.get("/folders/:id", folderController.renderFolder);

// Create folder inside a folder
folderRouter.post("/folders/:parentId/new", folderController.createFolder);

// Rename folder
folderRouter.post("/folders/:id", folderController.renameFolder);

// Delete folder
folderRouter.delete("/folders/:id", folderController.deleteFolder);

export default folderRouter;
