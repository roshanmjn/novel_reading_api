import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import { NotFound } from "./errors/index.js";
// import { sequelize } from "./database/connection.js";
import * as dotenv from "dotenv";
// import { syncModels } from "./database/sync.js";
// import { scrapeAndUpdate } from "./model/genre/genre.loadinto.db.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocs = require("./swagger_output.json");
import corn from "node-cron";
const app = express();
const port = 5999;
const host = "localhost";
dotenv.config();
let corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Headers": "",
    "Access-Control-Allow-Origin": "",
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", routes);
app.all("*", () => {
    throw new NotFound("Page not found!");
});
app.use(errorHandler);

app.listen(port, host, async () => {
    try {
        console.log(`Server hosted in http://${host}:${port}`);
        // await sequelize.authenticate();
        // await syncModels();

        const minutes = 5;
        // corn.schedule(`*/${minutes} * * * *`, async () => {
        //     console.log(`CRON JOB RUNNING AT ${minutes} MINUTES INTERVAL`);
        //     await scrapeAndUpdate();
        // });
    } catch (err) {
        throw err;
    }
});
