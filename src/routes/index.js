import express from 'express';

import videos from "./video.js";

const router = express.Router();

router.use("/web/videos", videos);

export default router;