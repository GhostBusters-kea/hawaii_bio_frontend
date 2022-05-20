import "https://unpkg.com/navigo"

import {
    renderText,
    setActiveLink,
    adjustForMissingHash,
    loadTemplate, renderTemplate
    
} from "./utility.js"



//import {addHandler} from "./pages/navigate/navigate.js";
import {setupTicketHandlers, reserveSeats, seatsReserved} from "./pages/ticket/ticket.js";
import {setupReservationHandlers} from "./pages/reservation/reservation.js";
import {getAllPerformancesOnMovie, loadAllPerformances, btnPerformance} from "./pages/performance/performance.js";
import {getParams, setupMovieHandlers} from "./pages/movie/movie.js";
import {logout, setupLoginHandlers, updateLoginDependentComponents} from "./pages/login/login.js"
import {setupRegisterHandlers} from "./pages/login/register.js";
import { setupAdminHandlers } from "./pages/admin/admin.js";



window.addEventListener("load", async () => {
    const templateHome = await loadTemplate("./pages/home/home.html")
    const templateAbout = await loadTemplate("./pages/about/about.html")
    const templateMovie = await loadTemplate("./pages/movie/movie.html")
    const templateMyPage = await loadTemplate("./pages/myPage/myPage.html")
    const templateMyAdminPage = await loadTemplate("./pages/myPage/myAdminPage.html")
    const templateLogin = await loadTemplate("./pages/login/login.html")
    const templateRegister = await loadTemplate("./pages/login/register.html")
    const templateAdmin = await loadTemplate("./pages/admin/admin.html")

    const templatePerformance = await loadTemplate("./pages/performance/performance.html")
    const templateReservations = await loadTemplate("./pages/reservation/reservation.html")

    const templateTicket = await loadTemplate("./pages/ticket/ticket.html")


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
            const role = sessionStorage.getItem("role")
            if (role === "USER"){
                renderTemplate(templateMyPage, "content")
            } else if (role === "ADMIN"){
                renderTemplate(templateMyAdminPage, "content")
            } else {
                renderTemplate(templateLogin, "content")
            }
        })
        .on("/register", () => {
            renderTemplate(templateRegister, "content")
            setupRegisterHandlers()
        })
        .on("/reservation", (match) => {
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
        .on("/ticket", (match)=> {
            renderTemplate(templateTicket, "content")
            setupTicketHandlers()
            seatsReserved(getParams(match))
            reserveSeats(getParams(match))




        })
        .on("/cinemahall", ()=> {
            renderTemplate(templateCinemaHall, "content")
            seatsReserved()
            reserveSeats()


        })
});

updateLoginDependentComponents()
window.onerror = (e) => alert(e)