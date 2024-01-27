import videoModel from "../models/video.model.js"

const getVideoAndSubtitles = async (videoId) => videoModel.getVideoAndSubtitles(videoId);

export default {
    getVideoAndSubtitles
};