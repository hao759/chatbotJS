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
  console.log("vo dc function success")
  MessengerExtensions.getContext(
    '661241558826141',
    function success(thread_context) {
      // success
      console.log("vo dc function success")
      $("#psid").val(thread_context.psid);
      handleClickButtonReserve();
    },
    function error(err) {
      // error
      console.log("Loi Reserve", err);
    }
  );
};

//validate inputs
// function validateInputFields() {
//   const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
//   let email = $("#email");
//   let orderNumber = $("#orderNumber");

//   if (!email.val().match(EMAIL_REG)) {
//       email.addClass("is-invalid");
//       return true;
//   } else {
//       email.removeClass("is-invalid");
//   }

//   if (orderNumber.val() === "") {
//       orderNumber.addClass("is-invalid");
//       return true;
//   } else {
//       orderNumber.removeClass("is-invalid");
//   }

//   return false;
// }

function handleClickButtonReserve() {
  $("#btnFindOrder").on("click", function (e) {
    console.log("vo dc handleClickButtonReserve")
    // let check = validateInputFields();
    let data = {
      psid: $("#psid").val(),
      email: $("#email").val(),
      phoneNumber: $("#phoneNumber").val(),
    };
    console.log("vo dc 1 1 1")
    if (1) {
      // close webview
      console.log("vo dc 1 1 1")
      MessengerExtensions.requestCloseBrowser(
        function success() {
          // webview closed
          console.log("Ko loi");
        },
        function error(err) {
          // an error occurred
          console.log("Loi roi", err);
        }
      );

      //send data to node.js server
      $.ajax({
        url: `${window.location.origin}/reserve-table-ajax`, //lay link hien tai
        method: "POST",
        data: data,
        success: function (data) {
          console.log(data);
        },
        error: function (error) {
          console.log(error);
        },
      });
    }
  });
}
