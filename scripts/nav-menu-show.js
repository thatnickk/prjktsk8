function navShow(){
    var nav = document.getElementById("navi");
    if (nav.style.display === "none"){
        nav.style.display = "inline-block";
    }
    else{
        nav.style.display = "none";
    }
}

var logbutt = document.getElementById("login-button");
logbutt.addEventListener('click', loginShow, false);

function loginShow(){
    var logbox = document.getElementById("loginbox");
    if (logbox.style.display == "none") 
        logbox.style.display = "inline-block";
    else
        logbox.style.display = "none";
}