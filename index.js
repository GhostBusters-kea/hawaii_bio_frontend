import "https://unpkg.com/navigo"

import {
    renderText,
    setActiveLink,
    adjustForMissingHash,
    loadTemplate, renderTemplate
} from "./utils.js"

import {addHandler} from "./pages/navigate/navigate.js";

window.addEventListener("load", async () => {
    const templateAbout = await loadTemplate("./pages/about/about.html")

    const router = new Navigo("/", { hash: true });
    router
        .hooks({
            before(done, match) {
                setActiveLink("menu", match.url)
                done()
            }
        })
        .on("/", () => renderText("Home", "content"))
        .on("/about", () => renderTemplate(templateAbout, "content"))
        .on( "/movies", (match) => {
            renderTemplate(templateMovies, "content")
            if (match.params) {
                document.getElementById("selected-movies-id").innerText = match.params.id
            }
        })
        .on("/reservations", () => {
            renderTemplate(templateReservations, "content")
            loadJoke()
        })
        .on("/login", () => {
            renderTemplate(templateLogin, "content")
            //TODO: handle admin login
        })
});


window.onerror = (e) => alert(e)