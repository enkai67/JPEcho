import db from "./baseModel.model.js"; 

const getVideoAndSubtitles = async (videoId) => {
    try {
        await db.connectToDatabase();

        return result = await db.executeQuery(
            `
            SELECT 
                video_uuid AS "videoUuid",
                video_title AS "videoTitle",
                video_url AS "videoUrl",
                s3_path AS "s3Path"
            FROM videos
            WHERE video_id = ?;
            `
        ,[videoId]);
    } finally {
        await db.disconnectFromDatabase();
    }
}

const getKeywords = async (videoId) => {
    try {
        await db.connectToDatabase();

        return result = await db.executeQuery(
            `
            SELECT 
                japanese_words AS "keywords"
            FROM words w
            JOIN wordSubtitleRelations wsr
                ON w.word_id = wsr.word_id
            JOIN subtitles s
                ON s.subtitle_id = wsr.subtitle_id
            WHERE video_id = ?;
            `
        ,[videoId]);
    } finally {
        await db.disconnectFromDatabase();
    }
}

const getQuizByVideoId = async (videoId) => {
    return [
        {
            quiz_id: "quizId",
            video_id: "video_id",
            timestamp_start: "timestamp_start",
            timestamp_end: "timestamp_end",
            question: "question",
            choice: "choice",
            answer: "answer"
        },
        {
            quiz_id: "quizId",
            video_id: "video_id",
            timestamp_start: "timestamp_start",
            timestamp_end: "timestamp_end",
            question: "question",
            choice: "choice",
            answer: "answer"
        }
    ];
};

const getQuestionnaireByVideoId = async (videoId) => {
    return {
        questionnaire: "example.com"
    }
};

export default {
    getVideoAndSubtitles,
    getKeywords,
    getQuizByVideoId,
    getQuestionnaireByVideoId
};