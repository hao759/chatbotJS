require("dotenv").config();
import request from "request";
import chatbotService from "../services/chatbotService";
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const { GoogleSpreadsheet } = require("google-spreadsheet");
// import moment from "moment";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

const url_img1 = "https://bit.ly/Miku001";
const url_img2 = "https://bit.ly/chibisutu";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
// let postWebHook = (req, res) => {
let postWebhook = (req, res) => {
  // Parse the request body from the POST
  console.log("=========Run postWebhook=======");
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
  console.log("=========Run getWebHook=======");
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

function handleMessage(sender_psid, received_message) {
  let response;
  if (received_message.text) {
    // Create the payload for a basic text message, which will be added to the body of our request to the Send API
    switch (received_message.text.toLowerCase()) {
      case "cc":
        response = {
          text: `Cút  :* `,
        };
      case "cdm":
      case "cdmm":
        response = {
          text: `Mẹ dặn không được chửi tục `,
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
          // text: `"${received_message.text}" chi bạn, gửi mình cái ảnh thử đi  :* `,
          text: "Chúng tôi đã nhận được tin nhắn của bạn và sẽ sớm trả lời. ",
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
            // {
            //   title: "Mày mới gửi cái hình này á hả? >.<",
            //   subtitle: "Nhấn nút dưới á,gõ tao không hiểu đâu. T_T",
            //   image_url: url_img1,
            //   buttons: [
            //     {
            //       type: "postback",
            //       title: "Ukm ;)",
            //       payload: "yes",
            //     },
            //     {
            //       type: "postback", //chạy vo ham handlePostBack
            //       title: "Éo :v",
            //       payload: "no",
            //     },
            //     {
            //       type: "web_url",
            //       url: `${process.env.URL_WEBVIEW_ORDER}/${sender_psid}`,
            //       title: "Để lại danh tính ;)",
            //       webview_height_ratio: "tall",
            //       messenger_extensions: true, //mo tren tag do
            //     },
            //   ],
            // },
            {
              title: "Cảm ơn đã cung cấp thêm thông tin",
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
    // case "yes":
    //   response = { text: "OK <3" };
    //   let response1 = chatbotService.sendImage(sender_psid);
    //   await callSendAPI(sender_psid, response1);
    //   break;

    // case "no":
    //   response = { text: "Vậy gửi lại đi nhấn chi nữa. ^_^" };
    //   break;

    case "Restart":
    case "GET_STARTED":
      await chatbotService.handleGetStarted(sender_psid);
      break;

    case "MAIN_MENU":
      await chatbotService.handleSendMenu(sender_psid);
      break;

    case "BacSi":
      await chatbotService.handleBacSi(sender_psid);
      break;

    case "BenhVien":
      await chatbotService.handleBenhVien(sender_psid);
      break;

    case "ChuyenKhoa":
      await chatbotService.handleChuyenKhoa(sender_psid);
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
    whitelisted_domains: [
      "https://chatbotjs.onrender.com/",
      "https://deploy-frontend-3krryll7m-hao759.vercel.app/",
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
      console.log("body :", body);
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
            url: "https://chatbotjs.onrender.com/",
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
  let senderId = req.params.senderId;

  return res.render("webView.ejs", { senderId: senderId });
};

let handlePostReserve = async (req, res) => {
  try {
    let response1 = {
      text: `       ---Thông tin khách hàng---
        \Họ tên :${req.body.customerName}
        \Email address: ${req.body.email}
        \Phone number: ${req.body.phoneNumber}
        `,
    };
    let data = {
      customerName: req.body.customerName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };
    await callSendAPI(req.body.senderId, response1);
    await writeGoogleSheet(data);
    return res.status(200).json({
      message: "ok1",
    });
  } catch (e) {
    console.log("Loi reserve ", e);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

let writeGoogleSheet = async (data) => {
  // let currentDate = new Date();

  let formatedDate = new Date().toLocaleString("vi-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });

  const format = "HH:mm DD/MM/YYYY";
  // let formatedDate = moment(time).format(format);

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  console.log("====================1==================");
  await doc.useServiceAccountAuth({
    client_email: JSON.parse(`"${GOOGLE_SERVICE_ACCOUNT_EMAIL}"`),
    private_key: JSON.parse(`"${GOOGLE_PRIVATE_KEY}"`),
  });
  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  // adding / removing sheets
  // const newSheet =  doc.addSheet({ title: "hot new sheet!" });

  //append row
  await sheet.addRow({
    "Họ và tên": data.customerName,
    Email: data.email,
    SDT: data.phoneNumber,
    "Thời gian": formatedDate,
  });
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
