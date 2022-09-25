require("dotenv").config();
import { response } from "express";
import request from "request";

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let callSendAPI = (sender_psid, response) => {
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
  return new Promise(async (resole, reject) => {
    try {
      let userName = await getUserName(sender_psid);
      let response = { text: `Hello ${userName} :), started rồi đó.` };
      await callSendAPI(sender_psid, response);
      resole("done");
    } catch (error) {
      reject(error);
    }
  });
};

let getUserName = (sender_psid) => {
  // let userName= "";
  // let request_body = {
  //     recipient: {
  //       id: sender_psid,
  //     },
  //     message: response,
  //   };
  // Send the HTTP request to the Messenger Platform
  return new Promise((resole, reject) => {
    request(
      {
        uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        method: "get",
      },
      (err, res, body) => {
        if (!err) {
          let body = JSON.parse(body);
          userName = `${body.first_name} ${body.last_name}`;
          resole(userName);
        } else {
          console.error("Unable to send message:" + err);
        }
      }
    );
  });
};

module.exports = {
  handleGetStarted,
  callSendAPI,
};
