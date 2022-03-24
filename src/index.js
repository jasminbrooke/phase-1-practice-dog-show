document.addEventListener('DOMContentLoaded', () => {
    getDogs()
})

const getDogs = () => {
    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach(dog => {
            const row = document.createElement("tr")
            const tdname = document.createElement("td")
            const tdbreed = document.createElement("td")
            const tdsex = document.createElement("td")
            const btn = document.createElement("button")
            const tbody = document.getElementById("table-body")

            tdname.innerText = dog.name
            tdbreed.innerText = dog.breed
            tdsex.innerText = dog.sex
            btn.innerText = "Edit"

            tbody.appendChild(row)
            row.appendChild(tdname)
            row.appendChild(tdbreed)
            row.appendChild(tdsex)
            row.appendChild(btn)
        })
    })
}


