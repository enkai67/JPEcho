import express from "express";
import videoController from "../controllers/video.controller.js";

const video = express.Router();

// Define your video-related routes here
video.get(
    '/',
    videoController.getVideoAndSubtitles
);

export default video;