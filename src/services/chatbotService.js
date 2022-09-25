require("dotenv").config();
import { response } from "express";
import request from "request";

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let callSendAPI = (sender_psid,res) => {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };
  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};

let handleGetStarted = (sender_psid) => {
  return new Promise(async(resole, reject) => {
    try {
        response = { text: "Hello :), started rồi đó." };
        await callSendAPI(sender_psid,response);
        resole('done');
    } catch (error) {
        reject(e);
    }
  });
};

module.exports = {
  handleGetStarted,
  callSendAPI,
};
