import { Router } from "express";
import fileController from "../controllers/fileController";
const fileRouter = Router();

fileController.post("/files/upload", fileController.uploadFile);

export default fileRouter;
