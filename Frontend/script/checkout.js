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
      <h3>${item.description}</h3>
      <h2 id="price">Price: ₹${item.price}</h2>
      <h3 id="Discount">Discount: ${item.discount}%</h3>
      <button id="${item._id}" class="remove" >Remove</button>
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










let ordersummary = document.querySelector(".ordersummary");

function myOrderSummary() {
  ordersummary.innerHTML = `
  <h2>Order Summary </h2>
        
  <div id="priceflex">
   <table>
    <tr>
      <td><h4>Total MRP</h4></td>
      <td><h4>${localStorage.getItem("total")}</h4></td>
    </tr>
    <tr>
      <td><h4>Total Discount</h4></td>
      <td><h4>${localStorage.getItem("discountgivenin_rupee")}</h4></td>
    </tr>
    <tr>
      <td><h4>Shipping Charges</h4></td>
      <td><h4 id="payable">Free</h4></td>
    </tr>
   </table>
   <table>
     <tr>
      <td><h1 id="payable">Payable Amount</h1></td>
      <td><h2>₹${localStorage.getItem("discountedAmount")}</h2></td>
     </tr>
   </table>
  </div>
  `;
}

myOrderSummary();

function gotoPaymentPay() {
  window.location.href = "payment.html";
}
