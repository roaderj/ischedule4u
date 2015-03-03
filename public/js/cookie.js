// Check if there is an user logged in
function checkCookie() {
    var email=getCookie("email");
    // if noone is logged in, go to login page
    if (email=="") {
        window.location = "/login";
    }
}

// Get the name of the user
function getCookie(cname) {
    var name = cname + "=";
    var cookie = document.cookie;
    cookie = cookie.replace("||", ";");
    var ca = cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkVersion() {
    checkCookie();
    var version=getCookie("version");
    return version;
}

function detectmob() {
   if(window.innerWidth <= 800 && window.innerHeight <= 600) {
     return true;
   } else {
     return false;
   }
}