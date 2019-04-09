const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// constants
const toyCollection = document.getElementById("toy-collection")


//page load functions
pageLoadFunctions()
function pageLoadFunctions(){
  fetchToys()
}

//event listeners
document.addEventListener('click', clickHandler)
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    addToySubmit()
  } else {
    toyForm.style.display = 'none'
  }
})

function clickHandler(e){
  if(e.target.classList.value ==="like-btn"){
  const id = e.target.parentNode.parentNode.dataset.id
  const newLikes = parseInt(e.target.parentNode.querySelector("p").innerText.split(" ")[0]) + 1
  fetch(`http://localhost:3000/toys/${id}`, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({likes: newLikes}) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(fetchToys)
  }
  if(e.target.classList.value ==="delete-btn"){
  const id = e.target.parentNode.dataset.id
  fetch(`http://localhost:3000/toys/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(fetchToys)
  }
}

function addToySubmit(){
  const form = document.querySelector(".add-toy-form")
  form.addEventListener('submit', submitToy)
  function submitToy(e){
    e.preventDefault()
    const toyName = document.getElementById("toyName").value
    const toyPix = document.getElementById("toyPics").value
    if (toyName && toyPix){putToy({name: toyName, image: toyPix, likes: 0})}
  }
}

function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  })
  .then(renderAllToys);
}

function renderAllToys(toys){
  toyCollection.innerHTML = ''
  toys.forEach(renderToy)
}

function renderToy(toy){
  newDiv = document.createElement("div")
  newDiv.className = "card"
  newDiv.dataset.id = toy.id
  newDiv.innerHTML =
      `<h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      <button class="delete-btn">Delete <3<</button>`
  toyCollection.appendChild(newDiv)
}

function putToy(toyObject){
  fetch('http://localhost:3000/toys', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(toyObject) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(fetchToys)
}
