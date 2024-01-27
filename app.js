import express from "express";
import appRouter from "./src/routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

import successHandler from "./src/middlewares/successHandler.js";

app.use(successHandler);

app.get("/health", (_req, res) => res.success()); // health checker

app.use(appRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});