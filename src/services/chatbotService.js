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

const BsHung = [
  "Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng",
  "Nguyên Trưởng phòng chỉ đạo tuyến tại Bệnh viện Da liễu Trung ương ",
  "https://res.cloudinary.com/dhzi2feeu/image/upload/v1665227871/Booking/114430-bshung_kuy3g5.jpg",
  "https://bookingcare.vn/pho-giao-su-tien-si-bac-si-cao-cap-nguyen-duy-hung-d168.html",
];

const BsNTHAn = [
  "Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thị Hoài An",
  "Nguyên Trưởng khoa Tai mũi họng trẻ em, Bệnh viện Tai Mũi Họng Trung ương",
  "https://res.cloudinary.com/dhzi2feeu/image/upload/v1665227871/Booking/090559-pgs-nguyen-thi-hoai-an_yh0mzj.jpg",
  "https://bookingcare.vn/pho-giao-su-tien-si-bac-si-nguyen-thi-hoai-an-d100.html",
];

const BsTMKhuyen = [
  "Bác sĩ Chuyên khoa II Trần Minh Khuyên",
  "Nguyên Trưởng khoa lâm sàng, Bệnh tâm thần Thành phố Hồ Chí Minh",
  "https://res.cloudinary.com/dhzi2feeu/image/upload/v1665227871/Booking/105401-bsckii-tran-minh-khuyen_ukkwzs.jpg",
  "https://bookingcare.vn/bac-si-chuyen-khoa-ii-tran-minh-khuyen-d1466.html",
];

const BsHQHung = [
  "Bác sĩ Chuyên khoa II Hà Quốc Hùng",
  "Gần 30 năm kinh nghiệm khám và điều trị chuyên sâu về các bệnh lý Nội khoa - Cơ xương khớp",
  "https://res.cloudinary.com/dhzi2feeu/image/upload/v1665227871/Booking/172821thac-si-bac-si-ha-quoc-hung_ehbmcu.jpg",
  "https://bookingcare.vn/bac-si-chuyen-khoa-ii-ha-quoc-hung-d595.html",
];

const BvDHYDuoc = [
  "Phòng khám Bệnh viện Đại học Y Dược 1",
  "20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM",
  "https://res.cloudinary.com/dhzi2feeu/image/upload/v1665237454/Booking/112414-pk-dhyd1_qb52hf.jpg",
  "https://bookingcare.vn/phong-kham-benh-vien-dai-hoc-y-duoc-1-p154.html",
];
const BVPKhamDaKSaiGon = [
  "Phòng khám Đa khoa Saigon Healthcare",
  "45 Thành Thái, Phường 14, Quận 10, Thành phố Hồ Chí Minh",
  "https://res.cloudinary.com/dhzi2feeu/image/upload/v1665237454/Booking/101727-anh-sg-toan-dien-ben-ngoai_ghclzw.jpg",
  "https://bookingcare.vn/phong-kham-da-khoa-saigon-healthcare-p252.html",
];

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
      console.log("---------", body, "-------");
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
      // let userName = await getUserName(sender_psid);
      // let response;
      // response={
      //   text: "Hello ",userName=="undefined undefined"?`${userName}`:"bạn", ":), started rồi đó. Gửi mình cái ảnh hay text thử đi",
      // }

      // if (userName != "undefined undefined")
      //   response = {
      //     text: `Hello ${userName} :), started rồi đó. Gửi mình cái ảnh hay text thử đi`,
      //   };
      // else
      //   response = {
      //     text: `Hello bạn :), started rồi đó. Gửi mình cái ảnh hay text thử đi`,
      //   };
      // callSendAPI(sender_psid, response);

      // let response1 = sendImage(sender_psid);
      sendButtonTemplateHello(sender_psid);
      let response2 = sendGIF();
      await callSendAPI(sender_psid, response2);

      // sendVideo(sender_psid);

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
            type: "postback", //chạy vo ham handlePostBack
            title: "Xem MAIN_MENU",
            payload: "MAIN_MENU",
          },
          {
            type: "web_url",
            url: `${process.env.URL_WEBVIEW_ORDER}/${sender_psid}`,
            title: "Để lại thông tin để tư vấn ;)",
            webview_height_ratio: "tall",
            messenger_extensions: true, //mo tren tag do
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
              {
                type: "postback",
                title: "Xem Bệnh Viện",
                payload: "BenhVien",
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
            media_type: "<video>",
            url: Gif1,
          },
        ],
      },
    },
  };
  return response;
};

let sendGIF = () => {
  let response = {
    //  message: {
    attachment: {
      type: "image",
      payload: {
        url: Gif1,
        is_reusable: true,
      },
    },
  };
  return response;
};

let sendVideo = (sender_psid) => {//day du """"
  let message = {
    "attachment": {
      "type": "template",
      "payload": {
         "template_type": "media",
         "elements": [
            {
               "media_type": "video",
               "url": "https://www.facebook.com/100086439574330/videos/548287560390373"
            }
         ]
      }
    }    
  }
  callSendAPI(sender_psid, message);
};

let handleBenhVien = (sender_psid) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: BvDHYDuoc[0],
            subtitle: BvDHYDuoc[1],
            image_url: BvDHYDuoc[2],
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: BvDHYDuoc[3],
                webview_height_ratio: "full",
              },
            ],
          },
          {
            title: BVPKhamDaKSaiGon[0],
            subtitle: BVPKhamDaKSaiGon[1],
            image_url: BVPKhamDaKSaiGon[2],
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: BVPKhamDaKSaiGon[3],
                webview_height_ratio: "full",
                // type: "postback",
                //   title: "Ukm ;)",
                //   payload: "yes",
              },
            ],
          },
        ],
      },
    },
  };
  callSendAPI(sender_psid, response);
};

let handleBacSi = (sender_psid) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: BsTMKhuyen[0],
            subtitle: BsTMKhuyen[1],
            image_url: BsTMKhuyen[2],
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: BsTMKhuyen[3],
                webview_height_ratio: "full",
              },
            ],
          },
          {
            title: BsHung[0],
            subtitle: BsHung[1],
            image_url: BsHung[2],
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: BsHung[3],
                webview_height_ratio: "full",
                // type: "postback",
                //   title: "Ukm ;)",
                //   payload: "yes",
              },
            ],
          },
          {
            title: BsNTHAn[0],
            subtitle: BsNTHAn[1],
            image_url: BsNTHAn[2],
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: BsNTHAn[3],
                webview_height_ratio: "full",
              },
            ],
          },
          {
            title: BsHQHung[0],
            subtitle: BsHQHung[1],
            image_url: BsHQHung[2],
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: BsHQHung[3],
                webview_height_ratio: "full",
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
  handleBenhVien,
  sendVideo,
  sendVideo1,
};
