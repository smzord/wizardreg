$(document).ready(function () { 
  const baseUrl = "https://signup.welink.com/api.php";
  var env = getCookie("env");
  if (env == null || env == "") { 
    $.ajax({
      async: true,
      crossDomain: false,
      url: baseUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
      },
      data: {
        action: "access-token",
      },
      success: function (res) { alert('res.data')
        //console.log("==res==", res.data);
        env = res.data;
        setCookie("env", env, 0.5);
      },
      error: function (err) {
        console.log("==err==", err.responseText);
      },
    });
  }
});

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
