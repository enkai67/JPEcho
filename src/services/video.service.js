import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from 'url';

import videoModel from "../models/video.model.js";
import S3Utils from "../utils/s3.js";
import videoUtils from "../utils/video.js";

const parseSrtFile = (downloadScript) => {
    const lines = downloadScript.split("\n\n");

    return lines.map(line => {
        const [serial, time, ...textLines] = line.split("\n").filter(Boolean);
        const [start, end] = time.split(" --> ");

        const cleanedTextLines = textLines.map(line => line.replace(/^>>\s*/, ''));
        const text = cleanedTextLines.join("\n");

        return { serial, start, end, text };
    });
};

const getVideoAndSubtitles = async (videoId) => {
    const currentDir = fileURLToPath(import.meta.url);
    const srtFilePath = join(currentDir, '../../script.srt');
    // const srtContent = readFileSync(srtFilePath, "utf-8"); //暫時
    // const subtitles = parseSrtFile(srtContent); //暫時

    // const { videoUuid, videoTitle, videoUrl, s3Path } = await videoModel.getVideoAndSubtitles(videoId);

    const s3Path = "tsd/aws_test_srt_file.srt";
    const downloadScript = await S3Utils.downloadS3Object(s3Path);
    const subtitles = parseSrtFile(downloadScript);

    const keywords = await videoModel.getKeywords(videoId);

    const updatedSubtitles = subtitles.map(subtitle => {
        const keywordsFound = keywords.filter(keyword => subtitle.text.includes(keyword));

        (keywordsFound) ? keywordsFound : null;

        return { ...subtitle, keywords: keywordsFound };
    });

    return { videoUuid, videoTitle, videoUrl, s3Path, updatedSubtitles };
};

const getKeywords = async (videoId) => {
    const keywords = await videoModel.getKeywords(videoId);

    console.log(keywords);

    return { keywords };
};

const getQuizByVideoId = async (videId) => {
    const quizInfo = await videoModel.getQuizByVideoId(videId);

    console.log(quizInfo);

    return { quizInfo };
};

const getQuestionnaireByVideoId = async (videId) => {
    const questionnairePath = await videoModel.getQuestionnaireByVideoId(videId);

    console.log(questionnairePath);

    return { questionnairePath };
};

export default {
    getVideoAndSubtitles,
    getKeywords,
    getQuizByVideoId,
    getQuestionnaireByVideoId
};