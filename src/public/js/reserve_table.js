(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "Messenger");

window.extAsyncInit = function () {
  // the Messenger Extensions JS SDK is done loading
  MessengerExtensions.getContext(
    661241558826141,
    function success(thread_context) {
      console.log("-------------3-----------------------");
      // success
      //set psid to input
      $("#psid").val(thread_context.psid);
      handleClickButtonReserveTable();
    },
    function error(err) {
      console.log("Lỗi đặt bàn  bot", err);
      //run fall back

      $("#psid").val(senderId);
      handleClickButtonReserveTable(senderId);
    }
  );
};

//validate inputs
// function validateInputFields() {
// console.log("----------------------")
//   const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;

//   let email = $("#email");
//   let phoneNumber = $("#phoneNumber");

//   if (!email.val().match(EMAIL_REG)) {
//       email.addClass("is-invalid");
//       return true;
//   } else {
//       email.removeClass("is-invalid");
//   }

//   if (phoneNumber.val() === "") {
//       phoneNumber.addClass("is-invalid");
//       return true;
//   } else {
//       phoneNumber.removeClass("is-invalid");
//   }

//   return true;// false;
// }

function handleClickButtonReserveTable(senderId) {
  $("#btnFindOrder").on("click", function (e) {
    let check = true;
    // jQuery('#btnFindOrder').css('opacity', '0.1');
    // check=; //return true or false
    var data = {
      // psid: $("#psid").val(),
      customerName: $("#customerName").val(),
      email: $("#email").val(),
      phoneNumber: $("#phoneNumber").val(),
      senderId: senderId,
    };
    if (1) {
      //close webview
      MessengerExtensions.requestCloseBrowser(
        function success() {
          // webview closed
        },
        function error(err) {
          console.log(err);
        }
      );
      //send data to node.js server
      $.ajax({
        url: `${window.location.origin}/reserve-table-ajax`,
        method: "POST",
        data: data,
        success: function (data) {
          console.log("fgf", data, "haha");
          document.getElementById("form").style.opacity = "0.5";
          document.getElementById("btnFindOrder").style.opacity = "0.1";
          document.getElementById("btnFindOrder").style.cursor = "default";
          // document.getElementById("btnFindOrder").style.disabled = "disabled";
          document.querySelector('#btnFindOrder').disabled = true;
        },
        error: function (error) {
          console.log("err", error);
        },
      });
    }
  });
}
