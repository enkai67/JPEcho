import db from "./baseModel.model.js";

const getVideoAndSubtitles = async (videoId) => {
    try {
        await db.connectToDatabase();

        return await db.executeQuery(
            `
            SELECT 
                title AS "videoTitle",
                url AS "videoUrl",
                s.s3_path AS "s3Path"
            FROM videos v
            JOIN subtitles s
                ON v.video_id = s.video_id
            WHERE v.video_id = ${videoId};
            `,
            [videoId]
        );
    } catch (error) {
        console.error("Error in getVideoAndSubtitles:", error);
        throw error;
    } finally {
        await db.disconnectFromDatabase();
    }
};

const getKeywords = async (videoId) => {
    try {
        await db.connectToDatabase();

        return await db.executeQuery(
            `
            SELECT 
                japanese_words AS "keywords"
            FROM words w
            JOIN wordSubtitleRelations wsr
                ON w.word_id = wsr.word_id
            JOIN subtitles s
                ON s.subtitle_id = wsr.subtitle_id
            WHERE video_id = ${videoId};
            `,
            [videoId]
        );
    } catch (error) {
        console.error("Error in getVideoAndSubtitles:", error);
        throw error;
    } finally {
        await db.disconnectFromDatabase();
    }
};

const getQuizByVideoId = async (videoId) => {
    try {
        await db.connectToDatabase();

        return await db.executeQuery(
            `
            SELECT 
                quiz_id AS "quizId",
                question,
                choice,
                answer
            FROM words w
            JOIN wordSubtitleRelations wsr
                ON w.word_id = wsr.word_id
            JOIN subtitles s
                ON s.subtitle_id = wsr.subtitle_id
            WHERE video_id = ${videoId};
            `,
            [videoId]
        );
    } catch (error) {
        console.error("Error in getVideoAndSubtitles:", error);
        throw error;
    } finally {
        await db.disconnectFromDatabase();
    }
};

const getQuestionnaireByVideoId = async (videoId) => {
    return {
        questionnaire: "example.com"
    };
};

export default {
    getVideoAndSubtitles,
    getKeywords,
    getQuizByVideoId,
    getQuestionnaireByVideoId
};
