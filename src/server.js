require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";

let app = express();

viewEngine(app);

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

initWebRoute(app);

let port = process.env.PORT || 9089;

app.listen(port, () => {
  console.log("Chat box dang o cong : " + port);
});
