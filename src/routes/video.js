import express from 'express';

const video = express.Router();

// Define your video-related routes here
video.get('/', (req, res) => {
  res.success('Video route');
});

export default video;