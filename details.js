const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGNjOGYyNjBjYzAwMTVjYzBkYzIiLCJpYXQiOjE3MjE5NzgwNTYsImV4cCI6MTcyMzE4NzY1Nn0.7UzdxQBGsLo9R_Skln0zgSgybnhiZy3KaeGBsyJ1jaw";
const addressBarParameters = new URLSearchParams(location.search);
const prodID = addressBarParameters.get("eventId");
console.log("eventId", prodID);

fetch("https://striveschool-api.herokuapp.com/api/product/" + prodID, {
  headers: {
    Authorization: "Bearer " + key,
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("ERRORE NELLA FETCH SINGOLA");
    }
  })
  .then((singleProd) => {
    console.log(singleProd);
    const HTMLrow = document.getElementById("detail-row");
    HTMLrow.innerHTML = `
    <div class="card mb-3 w-75">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${singleProd.imageUrl}" class="img-fluid rounded-start" alt="Prod image">
      </div>
      <div class="col-md-7">
        <div class="card-body text-start">
          <h5 class="card-title">${singleProd.name}</h5>
          <p class="card-text">${singleProd.description}</p>
          <p class="card-text"><small class="text-body-secondary">${singleProd.brand}</small></p>
          </div>
          <p class="card-text text-end">${singleProd.price} $</p>
      </div>
        <div class="border border-danger border-2 fit-content mx-auto p-3">
            <h3>ADMIN CONSOLE</h3>
            <div>
                <a href="./backoffice.html?eventId=${singleProd._id}" class="btn btn-warning">MODIFICA</a>
                <button class="btn btn-danger" onclick="deleteEvent()">ELIMINA</button>
            </div>
            <div class="text-end">
            <small class='text-muted'>${singleProd._id}</small>
            </div>
        </div>
    </div>
  </div>    `;
  })
  .catch((err) => {
    console.log(err);
  });

const deleteEvent = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + eventId, {
    method: 'DELETE',
    headers: {
        "Authorization": "Bearer " + key,
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
