import "https://unpkg.com/navigo"

import {
    renderText,
    setActiveLink,
    adjustForMissingHash,
    loadTemplate, renderTemplate
    
} from "./utility.js"

import {setupReservationHandlers, viewTickets} from "./pages/reservation/reservation.js";
import {getAllPerformancesOnMovie, loadAllPerformances, btnPerformance} from "./pages/performance/performance.js";
import {clicked} from "./pages/CinemaHall/cinemaHall.js";
import {getParams, setupMovieHandlers} from "./pages/movie/movie.js";
import {logout, setupLoginHandlers, updateLoginDependentComponents} from "./pages/login/login.js"
import {setupRegisterHandlers} from "./pages/login/register.js";
import { setupAdminHandlers } from "./pages/admin/admin.js";


window.addEventListener("load", async () => {
    const templateHome = await loadTemplate("./pages/home/home.html")
    const templateAbout = await loadTemplate("./pages/about/about.html")
    const templateMovie = await loadTemplate("./pages/movie/movie.html")
    const templateMyPage = await loadTemplate("./pages/myPage/myPage.html")
    const templateLogin = await loadTemplate("./pages/login/login.html")
    const templateRegister = await loadTemplate("./pages/login/register.html")
    const templateAdmin = await loadTemplate("./pages/admin/admin.html")

    const templatePerformance = await loadTemplate("./pages/performance/performance.html")
    const templateReservations = await loadTemplate("./pages/reservation/reservation.html")
    const templateCinemaHall = await loadTemplate("./pages/cinemaHall/cinemaHall.html")

    const router = new Navigo("/", { hash: true });
    router
        .hooks({
            before(done, match) {
                setActiveLink("menu", match.url)
                done()
            }
        })
        .on("/", () => renderTemplate(templateHome, "content"))
        .on("/about", () => renderTemplate(templateAbout, "content"))
        .on("/admin", () => {
            renderTemplate(templateAdmin, "content")
            setupAdminHandlers()})
        .on( "/movies", () => {
            renderTemplate(templateMovie, "content")
            setupMovieHandlers()

        })
        .on("/login", () => {
            renderTemplate(templateLogin, "content")
            setupLoginHandlers()

        })
        .on("/logout", () => {
            renderText("Home", "content")
            logout()
        })
        .on("/myPage", () => {
            renderTemplate(templateMyPage, "content")
        })
        .on("/register", () => {
            renderTemplate(templateRegister, "content")
            setupRegisterHandlers()
        })
        .on("/reservations", (match) => {
            renderTemplate(templateReservations, "content")

            if (match){
                setupReservationHandlers()
            }

        })
        .on("/performance", (match)=> {
            renderTemplate(templatePerformance, "content")
            getAllPerformancesOnMovie(getParams(match))
            loadAllPerformances(getParams(match))
            btnPerformance()


        })
        .on("/cinemahall", ()=> {
            renderTemplate(templateCinemaHall, "content")
            clicked()

        })
});

updateLoginDependentComponents()
window.onerror = (e) => alert(e)