import videoService from "../services/video.service.js";

const getVideoAndSubtitles = async (req, res) => {
    const videoId = req.params;

    const response = await videoService.getVideoAndSubtitles(videoId);

    res.success(response);
};

const getKeywords = async (req, res) => {
    const videoId = req.params;

    const response = await videoService.getKeywords(videoId);

    res.success(response);
}

const getQuizByVideoId = async (req, res) => {
    const videoId = req.params;

    const response = await videoService.getQuizByVideoId(videoId);

    res.success(response);
}

const getQuestionnaireByVideoId = async (req, res) => {
    const videoId = req.params;

    const response = await videoService.getQuestionnaireByVideoId(videoId);

    res.success(response);
}

export default {
    getVideoAndSubtitles,
    getKeywords,
    getQuizByVideoId,
    getQuestionnaireByVideoId
};