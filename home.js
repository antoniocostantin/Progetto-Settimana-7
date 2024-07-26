const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGNjOGYyNjBjYzAwMTVjYzBkYzIiLCJpYXQiOjE3MjE5NzgwNTYsImV4cCI6MTcyMzE4NzY1Nn0.7UzdxQBGsLo9R_Skln0zgSgybnhiZy3KaeGBsyJ1jaw'

const getProd = function(){
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
    "Authorization": "Bearer " + key
    }
    })
    .then((resp) => {
        console.log(resp)
        if(resp.ok)
            return resp.json()
        else 
            throw new Error("errore nella chiamata della api")
      })
      .then((data) => {
        creatCard(data)

      })
      .catch((err) => {
        console.log("Error", err)
      })
}
const creatCard = function(prods){
    console.log('Prods',prods)
    prods.forEach(prod => {
        console.log('Prod',prod)
        const Card = `
        <div class="card my-2 ">
        <a href="./details.html?prodId=${prod._id}" class="text-decoration-none text-dark">
        <img src="${prod.imageUrl}" class="card-img-top" alt="Prod Image">
        <div class="card-body">
        <h5 class="card-title">${prod.name}</h5>
        <p class="card-text text-muted">${prod.description}</p>
        <a href="./details.html?prodId=${prod._id}" class="btn my-3 text-decoration-none w-100 btn-outline-dark">View More</a>
        </div>
        </div>
        </a>
        </div>`
        
        const HTMLrow = document.getElementById('events-row')
        console.log(HTMLrow)
        HTMLrow.innerHTML = HTMLrow.innerHTML + Card
    });
}

const init = function(){
    getProd()
}

window.addEventListener('load', function () {
    init();
});