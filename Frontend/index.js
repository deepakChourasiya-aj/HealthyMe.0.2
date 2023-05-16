function changepage() {
  window.location.href = "./html/cartpage.html";
}
function gotoCheckout() {
  window.location.href = "checout.html";
}
let changeToName = document.getElementById("signup-to-name");
let userName = JSON.parse(localStorage.getItem("name"));
if (userName) {
  changeToName.innerText = "Hii " + userName.split(" ")[0];
}

//   ------------------------------------------------------------------------------

//   import footerFunc from "./footer"
//   console.log(footerFunc, "iiii footerFunc");
//   console.log('iiii footerFunc')
//   let footer = document.querySelector("#footer-section");
//   footer.innerHTML = footerFunc();

//---------------------------------------------------------------------------------

checkURL();
async function checkURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramEmail = urlParams.get("email");
  const paramValue = urlParams.get("id");
  const paramFirst_Name = urlParams.get("name");
  if (paramValue && paramName && paramEmail) {
    localStorage.setItem("token", JSON.stringify(paramValue));
    localStorage.setItem("name", JSON.stringify(paramFirst_Name));
    localStorage.setItem("email", JSON.stringify(paramEmail));
    // localStorage.setItem("last_name", JSON.stringify(paramLast_Name));
  }
}
