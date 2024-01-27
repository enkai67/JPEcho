import videoService from "../services/video.service.js";

const getVideoAndSubtitles = async (req, res) => {
    const videoId = req.params;

    const response = await videoService.getVideoAndSubtitles(videoId);

    res.success(response);
};

export default {
  getVideoAndSubtitles
};