document.addEventListener("DOMContentLoaded", evt => {
    const pageCounter = 1
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}`)
    .then(resp => resp.json())
    .then(monsters => monsters.forEach(renderMonster))

    function renderMonster(monsterObj) {
        let div = document.createElement("div")
        let h2 = document.createElement("h2")
        let h4 = document.createElement("h4")
        let pTag = document.createElement("p")

        h2.textContent = monsterObj.name
        h4.textContent = `Age: ${monsterObj.age}`
        pTag.textContent = `Bio: ${monsterObj.description}`

        div.append(h2, h4, pTag)
        const monsterContainer = document.querySelector("#monster-container")
        monsterContainer.append(div)
    }

    const monsterForm = document.createElement("form")
    monsterForm.id = "monster-form"

    const input1 = document.createElement("input")
    input1.id = "name"

    const input2 = document.createElement("input")
    input2.id = "age"

    const input3 = document.createElement("input")
    input3.id = "description"

    const button = document.createElement("button")
    button.innerText = "Create"

    monsterForm.append(input1, input2, input3, button)
    const createMonster = document.querySelector("#create-monster")
    createMonster.append(monsterForm)

    monsterForm.addEventListener("submit", evt => {
        evt.preventDefault()

        const monsterObj = {
            name: evt.target.name.value,
            age: evt.target.age.value,
            description: evt.target.description.value
        }

        const configObj = {
            method: 'POST',
            headers: {
                
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },

            body: JSON.stringify(monsterObj)

        }

        fetch("http://localhost:3000/monsters", configObj)
        .then(resp => resp.json())
        .then(monster => renderMonster(monster))
        
        evt.target.reset()
    })

    const buttonForward = document.querySelector("#forward")
    const buttonBack = document.querySelector("#back")

    buttonForward.addEventListener("click", evt => {
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${parseInt(pageCounter) + 1}`)
        .then(resp => resp.json())
        .then(monsters => monsters.forEach(renderMonster))
    })
})