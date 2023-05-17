const baseURL = "http://localhost:9000/api";

const insideProductbox = document.querySelector("#productbox");

async function checkoutProducts() {
  let res = await fetch(`${baseURL}/cart`, {
    method: "GET",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token")),
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();
  console.log(data);//check data 

  let cxpurchase = data.data.purchase;
  cartProduct(cxpurchase);
  var total = cxpurchase.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  localStorage.setItem("total", total);

  let discountedAmount = Math.floor(total - total * 0.1);
  localStorage.setItem("discountedAmount", discountedAmount);

  let discountgivenin_rupee = total - discountedAmount;
  localStorage.setItem("discountgivenin_rupee", discountgivenin_rupee);

  console.log(total);
}
checkoutProducts();

function cartProduct(cxpurchase) {
  insideProductbox.innerHTML = cxpurchase
    .map((item) => {
      return `
    <div id="insideproductbox">
    <div id="one">
      <img
        src="${item.image}"
        alt=""
      />
    </div>
    <div id="two">
      <h4>${item.description}</h4>
      <h2 id="price">Price: ₹${item.price}</h2>
      <h5 id="Discount">Discount: ${item.discount}%</h5>
      <button id="${item._id}" class="remove" >Remove</button>
      <button id="${item._id}" class="increase" >+</button>
      <button id="${item._id}" class="decrease" >-</button>
    </div>
  </div>
    `;
    })
    .join(" ");

    let removeButton = document.querySelectorAll(".remove");
    for(let btns of removeButton){
      btns.addEventListener("click",(e)=>{
        e.preventDefault();
         console.log(e.target.id);
         deleteProduct(e.target.id);
      });
    }

    let increase = document.querySelectorAll(".increase");
    for(let btns of increase){
      btns.addEventListener("click",(e)=>{
        e.preventDefault();
         console.log(e.target.id);
         increaseQuantity(e.target.id);
      });
    }
    let decrease = document.querySelectorAll(".decrease");
    for(let btns of decrease){
      btns.addEventListener("click",(e)=>{
        e.preventDefault();
         console.log(e.target.id);
         decreaseQuantity(e.target.id);
      });
    }
}


async function deleteProduct(id){
  let res = await fetch(`${baseURL}/cart/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token")),
      "Content-Type": "application/json",
    },
  });
  res = await res.json();
  location.reload()
  console.log(res);
}
async function increaseQuantity(id){
  let res = await fetch(`${baseURL}/cart/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token")),
      "Content-Type": "application/json",
    },
    body:{
      quantity:JSON.stringify(90)
    }
  });
  res = await res.json();
  location.reload()
  console.log(res,'quantitiy');
}

async function decreaseQuantity(id){
  let res = await fetch(`${baseURL}/cart/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token")),
      "Content-Type": "application/json",
    },
    body:{
      quantity:JSON.stringify(90)
    }
  });
  res = await res.json();
  location.reload()
  console.log(res,'quantitiy');
}


let ordersummary = document.querySelector(".ordersummary");

function myOrderSummary() {
  ordersummary.innerHTML = `
  <h2>Order Summary </h2>
        
  <div id="priceflex">
   <table>
    <tr>
      <td><h5>Total MRP</h5></td>
      <td><h5>${localStorage.getItem("total")}</h5></td>
    </tr>
    <tr>
      <td><h5>Total Discount</h5></td>
      <td><h5>${localStorage.getItem("discountgivenin_rupee")}</h5></td>
    </tr>
    <tr>
      <td><h5>Shipping Charges</h5></td>
      <td><h5 id="payable">Free</h5></td>
    </tr>
   </table>
   <table>
     <tr>
      <td><h4 id="payable">Payable Amount</h4></td>
      <td><h2>₹${localStorage.getItem("discountedAmount")}</h2></td>
     </tr>
   </table>
  </div>
  `;
}

myOrderSummary();

function gotoPaymentPay() {
  window.location.href = "../html/billing.html";
}
