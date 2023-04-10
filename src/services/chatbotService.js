require("dotenv").config();
import request from "request";

// const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const url_img2 = "https://bit.ly/chibisutu";
const imgXemthem =
  "https://res.cloudinary.com/dhzi2feeu/image/upload/v1667626713/13-cach-chao-mung-trong-tieng-anh-3_mbsfqo.jpg";
const imgZed =
  "https://res.cloudinary.com/dhzi2feeu/image/upload/v1680991910/Clothing/eXKAttLmn-2a9f3d3a1bd30d41e1bd63d07c7b387f_lpvagv.jpg.jpg";
const Gif1 =
  "https://res.cloudinary.com/dhzi2feeu/image/upload/v1664203319/anh-nen-dong-de-thuong_112053936_jzwopv.gif";

const BsBuiNgocAnh = [
  "Áo nữ 1 ",
  "Áo nữ 1",
  imgZed,
  "https://www.youtube.com/watch?v=5S01xsKjE0Y",
];

const BsNgocVy = [
  "Áo nữ 2",
  "Áo nữ 2",
  "https://res.cloudinary.com/dhzi2feeu/image/upload/v1680991888/Clothing/4vB8veCye-ao-thun-local-brand-pyramid_arh6mf.webp.webp",
  "https://www.youtube.com/watch?v=5S01xsKjE0Y",
];

const BvDHYDuoc = [
  "CLASH OF ROYAL",
  "20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM",
  "https://cdn.royaleapi.com/static/img/blog/2022-06-season36/s36-promo-sm.jpg?t=a866b36bc",
  "https://www.youtube.com/watch?v=5S01xsKjE0Y",
];
const BVPKhamDaKSaiGon = [
  "Phòng khám Đa khoa Saigon Healthcare",
  "45 Thành Thái, Phường 14, Quận 10, Thành phố Hồ Chí Minh",
  "https://res.cloudinary.com/dhzi2feeu/image/upload/v1667625003/Booking/co-xuong-khop_g59juy.jpg",
  "https://www.youtube.com/watch?v=5S01xsKjE0Y",
];

const CkCoXuongKhop = [
  "SEASON 24",
  "Game chiến thuật ? ...",
  "https://cdn.royaleapi.com/static/img/blog/2021-06-season24/s24-promo-sm.jpg?t=c6184d46c",
  "https://www.youtube.com/watch?v=5S01xsKjE0Y",
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
      sendButtonTemplateHello(sender_psid);

      let response2 = sendGIFAndIMG(Gif1);
      callSendAPI(sender_psid, response2);

      // let linkVideo =
      //   "https://www.facebook.com/100086439574330/videos/548287560390373";
      // sendVideo(sender_psid, linkVideo);//video khi ban qua met moi

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
        text: "Xin chào. Bạn cần gì ;) 💥❄️🚨⚡",
        buttons: [
          {
            type: "postback", //chạy vo ham handlePostBack
            title: "💥Tìm hiểu thêm ",
            payload: "MAIN_MENU",
          },
          {
            type: "web_url",
            url: `${process.env.URL_WEBVIEW_ORDER}/${sender_psid}`,
            title: "Cần tư vấn ?",
            webview_height_ratio: "full",
            // messenger_extensions: true, //mo tren tag do
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
      callSendAPI(sender_psid, response);
      resole("done");
    } catch (error) {
      reject(error);
    }
  });
};

let getMainMenuTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Các chức năng chính",
            subtitle: " Chọn để tìm hiểu thêm ",
            image_url: imgXemthem,
            buttons: [
              {
                type: "postback",
                title: "Sản phẩm cho nữ",
                payload: "BacSi",
              },
              {
                type: "postback",
                title: "Sản phẩm cho nam",
                payload: "BenhVien",
              },
              {
                type: "postback",
                title: "Gợi ý 3",
                payload: "ChuyenKhoa",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

let sendGIFAndIMG = (link) => {
  let response = {
    attachment: {
      type: "image",
      payload: {
        url: link,
        is_reusable: true,
      },
    },
  };
  return response;
};

let sendVideo = (sender_psid, linkVideo) => {
  let message = {
    attachment: {
      type: "template",
      payload: {
        template_type: "media",
        elements: [
          {
            media_type: "video",
            url: linkVideo,
          },
        ],
      },
    },
  };
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

let handleChuyenKhoa = (sender_psid) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: CkCoXuongKhop[0],
            subtitle: CkCoXuongKhop[1],
            image_url: CkCoXuongKhop[2],
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: CkCoXuongKhop[3],
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

let handleBacSi = (sender_psid) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: BsNgocVy[0],
            subtitle: BsNgocVy[1],
            image_url: BsNgocVy[2],
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: BsNgocVy[3],
                webview_height_ratio: "full",
              },
            ],
          },
          {
            title: BsBuiNgocAnh[0],
            subtitle: BsBuiNgocAnh[1],
            image_url: BsBuiNgocAnh[2],
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: BsBuiNgocAnh[3],
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
  handleBacSi,
  handleBenhVien,
  sendVideo,
  handleChuyenKhoa,
};
