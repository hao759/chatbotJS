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

const Gif1 =
  "https://res.cloudinary.com/dhzi2feeu/image/upload/v1664203319/anh-nen-dong-de-thuong_112053936_jzwopv.gif";

const BsHung=["Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng","Nguyên Trưởng phòng chỉ đạo tuyến tại Bệnh viện Da liễu Trung ương \nBác sĩ từng công tác tại Bệnh viện Da liễu Trung ương","https://res.cloudinary.com/dhzi2feeu/image/upload/v1665227871/Booking/114430-bshung_kuy3g5.jpg"]






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
      let response;
      // response={
      //   text: "Hello ",userName=="undefined undefined"?`${userName}`:"bạn", ":), started rồi đó. Gửi mình cái ảnh hay text thử đi",
      // }

      if (userName != "undefined undefined")
        response = {
          text: `Hello ${userName} :), started rồi đó. Gửi mình cái ảnh hay text thử đi`,
        };
      else
        response = {
          text: `Hello bạn :), started rồi đó. Gửi mình cái ảnh hay text thử đi`,
        };

      callSendAPI(sender_psid, response);

      // let response1 = sendImage(sender_psid);
      sendButtonTemplateHello(sender_psid);
      // let response2 = sendGIF();
      // await callSendAPI(sender_psid, response2);

      resole("done");
    } catch (error) {
      reject(error);
    }
  });
};

let sendButtonTemplateHello = (sender_psid) => {
  let message = {
    //dau : sai
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "Xin chào tôi có thể giúp gì bạn?",
        buttons: [
          {
            type: "web_url",
            url: "https://www.messenger.com",
            title: "Visit Messenger",
          },
          {
            type: "postback", //chạy vo ham handlePostBack
            title: "Cho tôi xem MAIN_MENU",
            payload: "MAIN_MENU",
          },
        ],
      },
    },
  };
  callSendAPI(sender_psid, message);
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
            title: "Bác sĩ ",
            subtitle: "Bông sen tử thần",
            image_url: imgKatarina,
            buttons: [
              {
                type: "postback",
                title: "Xem Bác Sĩ",
                payload: "BacSi",
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
          {
            title: "Lucario ",
            subtitle: "Mega Lucario",
            image_url:
              "https://i.pinimg.com/originals/ab/a4/df/aba4df2e9acaa860cc268a240c2b5520.jpg",

          },
        ],
      },
    },
  };
  return response;
};

let sendImage = () => {
  let response = {
    //  message: {
    attachment: {
      type: "image",
      payload: {
        url: url_img2, //"https://www.facebook.com/P.1500.Monster/videos/824824665207473",
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
            media_type: "<video>",
            url: Gif1,
          },
        ],
      },
    },
  };
  return response;
};

// let sendGIF = () => {
//   let response = {
//     //  message: {
//     attachment: {
//       type: "image",
//       payload: {
//         url: Gif1,
//         is_reusable: true,
//       },
//     },
//   };
//   return response;
// };

let handleBacSi = (sender_psid) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "BsHung[0]>.<",
            subtitle: "BsHung[1]",
            image_url: "BsHung[2]",
            buttons: [
              {
                type: "postback",
                title: "Ukm ;)",
                payload: "yes",
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
            ],
          },
        ],
      },
    },
  };
  callSendAPI(sender_psid, response);
};

module.exports = {
  handleGetStarted,
  callSendAPI,
  handleSendMenu,
  sendImage,
  handleBacSi,
};
