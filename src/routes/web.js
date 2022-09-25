import express from "express";
// import homepageController from "../controllers/homepageController";
import chatbotController from "../controller/chatbotcontrolller";

let router = express.Router();

let initWebRoute = (app) => {
  // router.get("/", chatbotController.getHomePage);
  // router.post("/webhook", chatbotController.postWebHook);
  // router.get("/webhook", chatbotController.getWebHook);

  router.get("/", (req, res) => {
    res.render("test.ejs");
  });
  router.post("/", (req, res) => {
    console.log("req la :", req.body);
    res.render("test.ejs");
  });
  router.get("/webhook", chatbotController.getWebHook);
  router.post("/webhook", chatbotController.postWebhook);

  return app.use("/", router);
};



module.exports = initWebRoute;
