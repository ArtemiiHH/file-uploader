import { Router } from "express";
import fileController from "../controllers/fileController.js";

const fileRouter = Router();

fileRouter.post("/files/upload", fileController.uploadFile);

export default fileRouter;
