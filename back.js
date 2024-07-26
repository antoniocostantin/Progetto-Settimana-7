class Product {
  constructor(_name, _description, _brand, _imgUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imgUrl;
    this.price = _price;
  }
}

const btnjsHTML = document.getElementById("btnjs");
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGNjOGYyNjBjYzAwMTVjYzBkYzIiLCJpYXQiOjE3MjE5NzgwNTYsImV4cCI6MTcyMzE4NzY1Nn0.7UzdxQBGsLo9R_Skln0zgSgybnhiZy3KaeGBsyJ1jaw";
const prodID = new URLSearchParams(location.search).get("prodId");

const Url = "https://striveschool-api.herokuapp.com/api/product/";
let URLuse = Url;
let method = "";
if (prodID) {
  method = "PUT";
  URLuse = Url + prodID;
  btnjsHTML.classList.add("d-inline");
} else {
  method = "POST";
  URLuse = Url;
  btnjsHTML.classList.add("d-none");
}

if (prodID) {
  fetch(Url + prodID, {
    headers: {
      Authorization: "Bearer " + key,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nel recupero del singolo prodotto");
      }
    })
    .then((prod) => {
      console.log("PROD", prod);
      document.getElementById("name").value = prod.name;
      document.getElementById("description").value = prod.description;
      document.getElementById("brand").value = prod.brand;
      document.getElementById("imgurl").value = prod.imageUrl;
      document.getElementById("price").value = prod.price;
    })
    .catch((err) => {
      console.log(err);
    });
}

const eventForm = document.getElementById("product-form");
eventForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const nameValue = document.getElementById("name").value;
  const descriptionValue = document.getElementById("description").value;
  const priceValue = document.getElementById("price").value;
  const brandValueInput = document.getElementById("brand").value;
  const imgurlValueInput = document.getElementById("imgurl").value;

  console.log(
    nameValue,
    descriptionValue,
    priceValue,
    brandValueInput,
    imgurlValueInput
  );

  const newProd = new Product(
    nameValue,
    descriptionValue,
    brandValueInput,
    imgurlValueInput,
    priceValue
  );

  console.log(newProd);

  fetch(URLuse, {
    method: method,
    body: JSON.stringify(newProd),
    headers: {
      Authorization: "Bearer " + key,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("PRODOTTO SALVATO!");
        location.assign("./homepage.html");
      } else {
        alert("ERRORE NEL SALVATAGGIO!");
        throw new Error("Errore nel salvataggio del prodotto");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
});

const deleteProd = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + prodID, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + key,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("PRODOTTO ELIMINATO");
        location.assign("./homepage.html");
      } else {
        throw new Error("Problema nell'eliminazione");
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};

let logged = false;
let myModal = new bootstrap.Modal(document.getElementById("myModal"));

const closemodal = function(){
  const usernameHTML = document.getElementById("username").value
  const passwordHTML = document.getElementById("password").value
  if(usernameHTML)
    sessionStorage.setItem("username", `${usernameHTML}`)

  if(passwordHTML)
    sessionStorage.setItem("password", `${passwordHTML}`)
}

window.addEventListener("load",function(){
  let username = sessionStorage.getItem("username")
  let password = sessionStorage.getItem("password")
  if(!username && !password)
    myModal.show()
  else
    myModal.hide()
})
