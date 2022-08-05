$(document).ready(function(){
    $.ajax({
        async: true,
        crossDomain: false,
        url: baseUrl+"services/apexrest/welinkRegistration",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
        },
        data: JSON.stringify({
          action: "access-token",
        }),
        success: function (res) {
          console.log("==res==", res);
          env = res;
          setCookie("env", res, 0.5);
        },
        error: function (err) {
          console.log("==err==", err);
        },
      });
})