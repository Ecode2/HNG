import express from "express";

import task_1 from "./task 1/app.js";

const app = express();

app.use('/', task_1);

app.listen(3000, () => console.log("Server running on https://localhost:3000"));