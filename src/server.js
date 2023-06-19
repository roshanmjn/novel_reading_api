import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
const app = express();
const port = 5999;
const host = "localhost";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

app.all("*", (req, res) => {
    console.log("No such path found");
});
app.listen(port, host, () => {
    try {
        console.log(`Server hosted in http://${host}:${port}`);
    } catch (err) {
        console.error("Unable to connect to the DB: ", err);
    }
});
