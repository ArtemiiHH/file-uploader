import { Router } from "express";
import fileController from "../controllers/fileController.js";
import upload from "../config/multer.js";

const fileRouter = Router();

fileRouter.post(
  "/files/upload",
  upload.single("file"),
  fileController.uploadFile,
);

export default fileRouter;
