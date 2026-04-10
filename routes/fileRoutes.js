import { Router } from "express";
import fileController from "../controllers/fileController.js";
import upload from "../config/multer.js";

const fileRouter = Router();

// Upload file
fileRouter.post(
  "/files/upload",
  upload.single("file"),
  fileController.uploadFile,
);

// Create file
fileRouter.post("/files/new", fileController.createFile);

export default fileRouter;
