require("dotenv").config();
// import { response } from "express";
import request from "request";

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const url_img2 = "https://bit.ly/chibisutu";
const imgKatarina =
  "https://ecdn.game4v.com/g4v-content/uploads/2021/03/LMHT-Toc-Chien-ra-mat-Katarina-GAME4V.jpg";

const imgZed =
  "https://vcdn.kenhgamevn.com/wp-content/uploads/2021/11/18032623/238031.jpeg";

const Gif1 = "https://www.facebook.com/P.1500.Monster/videos/682232322746331/";

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
      let response1 = sendImage(sender_psid);
      let response2 = SendButton_Template();
      await callSendAPI(sender_psid, response);
      await callSendAPI(sender_psid, response1);
      await callSendAPI(sender_psid, response2);

      resole("done");
    } catch (error) {
      reject(error);
    }
  });
};

let getUserName = (sender_psid) => {
  return new Promise((resole, reject) => {
    request(
      {
        uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        method: "get",
      },
      (err, res, body) => {
        if (!err) {
          body = JSON.parse(body);
          let userName = `${body.last_name} ${body.first_name}`;
          resole(userName);
        } else {
          console.error("Unable to send message:" + err);
        }
      }
    );
  });
};

let handleSendMenu = (sender_psid) => {
  return new Promise(async (resole, reject) => {
    try {
      let response = getMainMenuTemplate();
      await callSendAPI(sender_psid, response);
      resole("done");
    } catch (error) {
      reject(error);
    }
  });
};
// let getStartedTemplete=()=>{
//   let response = {
//     attachment: {
//       type: "template",
//       payload: {
//         template_type: "generic",
//         elements: [
//           {
//             title: "Chao ban",
//             subtitle: "Nhấn nút dưới á,gõ tao không hiểu đâu. T_T",
//             image_url: url_img2,
//             buttons: [
//               {
//                 type: "postback",
//                 title: "Ukm ;)",
//                 payload: "yes",
//               },
//               {
//                 type: "postback", //chạy vo ham handlePostBack
//                 title: "Éo :v",
//                 payload: "no",
//               },
//               {
//                 type: "postback",
//                 title: "Đoán xem ",
//                 payload: "maybe",
//               },
//             ],
//           },
//         ],
//       },
//     },
//   };
// }

let getMainMenuTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Katarina ",
            subtitle: "Bông sen tử thần",
            image_url: imgKatarina,
            buttons: [
              {
                type: "postback",
                title: "Ukm ;)",
                payload: "yes",
              },
            ],
          },
          {
            title: "Chao ban. Day la getMainMenuTemplate2",
            subtitle: "getMainMenuTemplate",
            image_url: imgZed,
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
            ],
          },
        ],
      },
    },
  };
  return response;
};

let sendImage = (sender_psid) => {
  let response = {
    //  message: {
    attachment: {
      type: "image",
      payload: {
        url: url_img2,
        is_reusable: true,
      },
    },
  };

  return response;
};

let SendButton_Template = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "media",
        elements: [
          {
            media_type: "<image|video>",
            url: Gif1,
          },
        ],
      },
    },
  };
  return response;
};

module.exports = {
  handleGetStarted,
  callSendAPI,
  handleSendMenu,
};
