import { makeOptions, renderTemplate, setActive, showPage } from "./Utility.js"

function renderMenuItems(evt) {
    const element = evt.target
    setActive(element)
    const id = element.id;
    renderTemplate(id)  //This setups the HTML for the page
    switch (id) {
        //Here you can execute JavaScript for the selected page
        case "about" : {

        }
    }
}

document.getElementById("menu").onclick = renderMenuItems;
showPage("quiz")