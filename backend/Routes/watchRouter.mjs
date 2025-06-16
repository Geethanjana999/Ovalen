import express, { Router } from "express";
import multer from "multer";
import {
  addWatch,
  getWatchById,
  listWatches,
  removeWatch,
  updateWatch,
} from "../Controllers/watchController.mjs";

const watchRouter = Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "./Uploads",
  filename: (request, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`); // template literal to rename file - make unique filename
  },
});

const upload = multer({ storage: storage }); // upload -> middleware

// add watch items - create
watchRouter.post("/add", upload.single("image"), addWatch); // here field name is -> image
// get list of watch items - read
watchRouter.get("/list", listWatches);
// remove watch item - delete
watchRouter.post("/remove", removeWatch);
// update watch item - update
watchRouter.put("/update/:id", upload.single("image"), updateWatch); // here field name is -> image
// get single item
watchRouter.get("/watch/:id", getWatchById);

export default watchRouter;
