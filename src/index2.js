document.addEventListener("DOMContentLoaded", () => {
    getDogs()
})


const editDogs = (dog) => {
    const form = document.getElementById("dog-form")
    const inputs = form.querySelectorAll('input')
    const name = inputs[0]
    const breed = inputs[1]
    const sex = inputs[2]

    name.value = dog.name
    breed.value = dog.breed
    sex.value = dog.sex

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/dogs/${dog.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...dog,
                name: name.value,
                breed: breed.value,
                sex: sex.value
            }),
            headers: {'Content-type': "application/json"}
        })
        .then(() => clearDogs())
        .then(() => getDogs())
    })    
}

const clearDogs = () => {
    const tBody = document.getElementById("table-body")
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild)
    }
}

const getDogs = () => {
    const tBody = document.getElementById("table-body")

    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(data => {
        data.forEach(dog => {
            const row = document.createElement("tr")
            const tname = document.createElement("td")
            const tbreed = document.createElement("td")
            const tsex = document.createElement("td")
            const edit = document.createElement("button")

            tname.innerText = dog.name
            tbreed.innerText = dog.breed
            tsex.innerText = dog.sex
            edit.innerText = "Edit Dog"

            row.append(tname, tbreed, tsex, edit)
            tBody.appendChild(row)

            edit.addEventListener("click", () => {
                editDogs(dog)
            })
        })
    })
}