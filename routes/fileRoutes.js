import { Router } from "express";
import fileController from "../controllers/fileController.js";
import upload from "../config/multer.js";

const fileRouter = Router();

// Upload file (ROOT)
fileRouter.post(
  "/files/upload",
  upload.single("file"),
  fileController.uploadFile,
);

// Upload file inside a folder
fileRouter.post(
  "/files/upload/:folderId",
  upload.single("file"),
  fileController.uploadFile,
);

// Delete file
fileRouter.delete("/files/:id", fileController.deleteFile);

export default fileRouter;
