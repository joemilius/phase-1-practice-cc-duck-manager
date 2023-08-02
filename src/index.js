// write your code here!
let ducks = []
let navBar = document.querySelector('#duck-nav')
fetch(`http://localhost:3000/ducks`)
.then(res => res.json())
.then(data => {
    ducks = data
    data.forEach(duck =>renderNavDucks(duck))
})

function renderNavDucks(duck){
    let image = document.createElement('img')
    image.src = duck.img_url
    navBar.append(image)

    image.addEventListener('click', (e) => {
        let name = document.querySelector('#duck-display-name')
        name.textContent = duck.name
        let displayImage = document.querySelector('#duck-display-image')
        displayImage.src = duck.img_url
        let likes = document.querySelector('#duck-display-likes')
        likes.textContent = `${duck.likes} likes`
    })
}

let likes = document.querySelector('#duck-display-likes')
likes.addEventListener("click", (event) => {
    let duckName = event.target.previousElementSibling.previousElementSibling.textContent
    ducks = ducks.map(duck => {
        if (duck.name === duckName){
            duck.likes++
            return duck
        }else {
            return duck
        }
    })
    let foundDuck = ducks.find(duck => duckName === duck.name)
    fetch(`http://localhost:3000/ducks/${foundDuck.id}`, {
        method: "PATCH",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            likes: foundDuck.likes
        })
    })
    .then(res => res.json())
    .then(updatedDuck => event.target.textContent = `${updatedDuck.likes} likes`)
})

let duckForm = document.querySelector('#new-duck-form')
duckForm.addEventListener('submit', event => {
    event.preventDefault()
    let newDuckName = event.target[0].value
    let newDuckImage = event.target[1].value

    let duckObject = {
        name: newDuckName,
        img_url: newDuckImage,
        likes: 0
    }
    fetch(`http://localhost:3000/ducks`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(duckObject)
    })
    .then(res => res.json())
    .then(newDuck => {
        ducks.push(newDuck)
        renderNavDucks(newDuck)
    })
})