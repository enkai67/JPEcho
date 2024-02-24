import express from "express";

import videoController from "../controllers/video.controller.js";
import { wrapHandlerWithErrorCatcher } from "../utils/response.js";

const video = express.Router();

video.get(
    '/',
    wrapHandlerWithErrorCatcher(videoController.getVideoAndSubtitles)
);

video.get(
    '/videoId/keywords', //'/:videoId/keywords',
     wrapHandlerWithErrorCatcher(videoController.getKeywords)
)

video.get(
    '/:videoId/quiz/',
     wrapHandlerWithErrorCatcher(videoController.getQuizByVideoId)
)

video.get(
    '/:videoId/questionnaire/',
     wrapHandlerWithErrorCatcher(videoController.getQuestionnaireByVideoId)
);

export default video;