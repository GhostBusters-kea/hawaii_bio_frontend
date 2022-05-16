import "https://unpkg.com/navigo"

import {
    renderText,
    setActiveLink,
    adjustForMissingHash,
    loadTemplate, renderTemplate
    
} from "./utility.js"

import {setupReservationHandlers, viewTickets} from "./pages/reservation/reservation.js";
//import {addHandler} from "./pages/navigate/navigate.js";
import {getAllPerformancesOnMovie, loadAllPerformances} from "./pages/performance/performance.js";
import {clicked, seatsReserved} from "./pages/CinemaHall/cinemaHall.js";
import {getParams, setupMovieHandlers} from "./pages/movie/movie.js";


window.addEventListener("load", async () => {
    const templateAbout = await loadTemplate("./pages/about/about.html")
    const templatePerformance = await loadTemplate("./pages/performance/performance.html")
    const templateReservations = await loadTemplate("./pages/reservation/reservation.html")

    const templateCinemaHall = await loadTemplate("./pages/cinemaHall/cinemaHall.html")
    const templateMovie = await loadTemplate("./pages/movie/movie.html")

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
        .on( "/movie", () => {
            renderTemplate(templateMovie, "content")
            setupMovieHandlers()

        })
        .on("/reservations", (match) => {
            renderTemplate(templateReservations, "content")

            if (match){
                setupReservationHandlers()
            }

        })
        .on("/login", () => {
            renderTemplate(templateLogin, "content")
            //TODO: handle admin login
        })
        .on("/performance", (match)=> {
            renderTemplate(templatePerformance, "content")
            getAllPerformancesOnMovie(getParams(match))
            loadAllPerformances(getParams(match))


        })
        .on("/cinemahall", ()=> {
            renderTemplate(templateCinemaHall, "content")
            clicked()
            seatsReserved()

        })
});


window.onerror = (e) => alert(e)