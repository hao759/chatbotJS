require("dotenv").config();
import request from "request";
import chatbotService from "../services/chatbotService";
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const url_img1 = "https://bit.ly/Miku001";
const url_img2 = "https://bit.ly/chibisutu";

// let postWebHook = (req, res) => {
let postWebhook = (req, res) => {
  // Parse the request body from the POST
  let body = req.body;
  // Check the webhook event is from a Page subscription
  if (body.object === "page") {
    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Return a '200 OK' response to all events
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

let getHomePage = (req, res) => {
  res.send("Hello world hehe");
};

let getWebHook = (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  console.log("VERIFY_TOKEN");

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // if (mode === "subscribe" && token === config.verifyToken) {   sai nek ban
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};
//

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;
  if (received_message.text) {
    // Create the payload for a basic text message, which will be added to the body of our request to the Send API
    // response = {
    //   text: `"${received_message.text}" chi bạn, gửi mình cái ảnh thử đi  :* `,
    // };
    switch (received_message.text) {
      case "cc":
        response = {
          text: `Cút  :* `,
        };
        break;
      case "alo":
        response = {
          text: `Gì nói đại đi lô lô :* `,
        };
        break;
      case "e":
      case ".":
        response = {
          text: `${received_message.text} qq  :* `,
        };
        break;

      default:
        response = {
          text: `"${received_message.text}" chi bạn, gửi mình cái ảnh thử đi  :* `,
        };
        break;
    }
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Mày mới gửi cái hình này á hả? >.<",
              subtitle: "Nhấn nút dưới á,gõ tao không hiểu đâu. T_T",
              image_url: url_img1,
              buttons: [
                {
                  type: "postback",
                  title: "Ukm ;)",
                  payload: "yes",
                },
                {
                  type: "postback", //chạy vo ham handlePostBack
                  title: "Éo :v",
                  payload: "no",
                },
                {
                  type: "web_url",
                  url: `${process.env.URL_WEBVIEW_ORDER}/${sender_psid}`,
                  title: "Reserve",
                  webview_height_ratio: "tall",
                  messenger_extensions: true, //mo tren tag do
                },
              ],
            },
            {
              title: "Hay này hả? >.<",
              subtitle: "Chắc là vậy T_T",
              image_url: attachment_url,
              buttons: [
                {
                  type: "postback", //chạy vo ham handlePostBack
                  title: "MAIN_MENU",
                  payload: "MAIN_MENU",
                },
                {
                  type: "postback",
                  title: "Khởi động lại bot",
                  payload: "Restart",
                },
              ],
            },
          ],
        },
      },
    };
  }

  // Send the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
  let response;
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload

  switch (payload) {
    case "yes":
      response = { text: "OK <3" };
      let response1 = chatbotService.sendImage(sender_psid);
      await callSendAPI(sender_psid, response1);
      break;

    case "no":
      response = { text: "Vậy gửi lại đi nhấn chi nữa. ^_^" };
      break;
    case "Restart":
    case "GET_STARTED":
      await chatbotService.handleGetStarted(sender_psid);
      break;

    case "MAIN_MENU":
      await chatbotService.handleSendMenu(sender_psid);
      break;

    default:
      response = { text: "Oop :), default " };
      break;
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
async function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  await sendTypingOn(sender_psid);
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
}

let setupProfile = async (req, res) => {
  //????????????????
  //call profile api facebook
  let request_body = {
    get_started: { payload: "GET_STARTED" },
    whitelisted_domains: ["https://chatbotlan2.herokuapp.com/"],
  };
  // Send the HTTP request to the Messenger Platform
  await request(
    {
      uri: `https://graph.facebook.com/v15.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      console.log(body);
      if (!err) {
        console.log("setup user profile succeed!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
  return res.send("OK chào bạn :)");
};
let setupPersistent = async (req, res) => {
  let request_body = {
    persistent_menu: [
      {
        locale: "default",
        composer_input_disabled: false,
        call_to_actions: [
          {
            type: "postback",
            title: "Mở Main_menu",
            payload: "MAIN_MENU",
          },
          {
            type: "web_url",
            title: "Heroku",
            url: "https://chatbotlan2.herokuapp.com/",
            webview_height_ratio: "full",
          },
          {
            type: "postback",
            title: "Khởi động lại bot",
            payload: "Restart",
          },
        ],
      },
    ],
  };
  // Send the HTTP request to the Messenger Platform
  await request(
    {
      uri: `https://graph.facebook.com/v15.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      console.log(body);
      if (!err) {
        console.log("setup persist profile succeed!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};

let sendTypingOn = (sender_psid) => {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    sender_action: "typing_on",
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





let handleReserve = (req, res) => {
  
  let senderId=req.params.senderId;

  return res.render("webView.ejs",{senderId:senderId});
};

let handlePostReserve = async (req, res) => {
  try {
    console.log("2")
    // let customerName = "";
    // if (req.body.customerName === "") {
    //   customerName = "Empty";
    // } else customerName = req.body.customerName;
    console.log("3")
    let response1 = {
      text: `---Info about your lookup đặt bàn---
        \Email address: ${req.body.email}
        \Phone number: ${req.body.phoneNumber}
        `
    };//\nHọ tên: ${customerName}
    console.log("4")

    await callSendAPI(req.body.psid, response1);
    console.log("4")

    return res.status(200).json({
      message: "ok1",
    });
  } catch (e) {
    console.log("Loi reserve table");
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getHomePage,
  getWebHook,
  postWebhook,
  setupProfile,
  setupPersistent,
  handleReserve,
  handlePostReserve,
};
