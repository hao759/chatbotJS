import express from "express";
// import homepageController from "../controllers/homepageController";
import chatbotController from "../controller/chatbotcontrolller";
// import homeController from "../controller/homeController"

let router = express.Router();

let initWebRoute = (app) => {
  router.get("/", (req, res) => {
    res.render("test.ejs");
  });
  // router.post("/", (req, res) => {
  //   console.log("req la :", req.body);
  //   res.render("test.ejs");
  // });

  router.post("/setup_profile", chatbotController.setupProfile);
  
  router.post("/setup_persistent_menu", chatbotController.setupPersistent);

  router.get("/webhook", chatbotController.getWebHook);
  router.post("/webhook", chatbotController.postWebhook);

  router.get("/reserve", chatbotController.handleReserve);

  return app.use("/", router);
};

module.exports = initWebRoute;
