import express from "express"
import multer from "multer"
import hbs from "hbs"
import "./config/dbConn.js"
import { config } from "dotenv";
config();
import path from "path"
import url from "url";
import homeRouter from "./routes/homeRoute.js"

const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views")
const partialsPath = path.join(__dirname, "./templates/partials")

app.use(express.json());
app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.set("views",  viewsPath);
hbs.registerPartials(partialsPath)

app.use("/", homeRouter);

app.use((req, res) => {
    res.status(404).send("<h1>404, Page not found</h1>")
})



app.listen(process.env.PORT, () => {
    console.log(`server started listening on port ${process.env.PORT}`);
})