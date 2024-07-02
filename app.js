import express from "express";

import task from "./task 1/app.js";

const app = express();
app.use('/', task_1);

app.listen(process.env.PORT || 3000, () => console.log("Server running on https://localhost:3000"));
