import express from "express";
// import homepageController from "../controllers/homepageController";
import chatbotController from "../controller/chatbotcontrolller";

let router = express.Router();

let initWebRoute = (app) => {
  router.get("/", (req, res) => {
    res.render("test.ejs");
  });

  router.post("/setup_profile", chatbotController.setupProfile);
  
  router.post("/setup_persistent_menu", chatbotController.setupPersistent);

  router.get("/webhook", chatbotController.getWebHook);
  router.post("/webhook", chatbotController.postWebhook);

  router.get("/reserve/:senderId", chatbotController.handleReserve);

  router.post("/he", chatbotController.handlePostReserve);
// /reserve-table-ajax
  
  return app.use("/", router);
};

module.exports = initWebRoute;
