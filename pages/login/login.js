import { apiRoot } from "../../settings.js"
import { handleErrors, makeOptionsToken } from "../../fetchUtils.js"

let isLoggedIn = false

export function setupLoginHandlers() {
    setNavLog(isLoggedIn)
    document.getElementById("submit-login").onclick = login
    document.getElementById("log-out-btn").onclick = logout
}

// function setNavLog(isLoggedIn){
//     if (isLoggedIn) {
//         const logOut = "<button id='log-out-btn' type=\"button\" class=\"btn btn-link\">Log out</button>"
//         document.getElementById("nav-login").insertAdjacentHTML("afterbegin", logOut)
//     } else {
//         const login = "<ul class=\"nav navbar-nav navbar-right\">\n" +
//             "                <li class=\"dropdown\">\t<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\">\n" +
//             "\t\t\t\t\t\t\tSign In<span class=\"caret\"></span>\n" +
//             "\t\t\t\t\t\t</a>\n" +
//             "\n" +
//             "                    <div class=\"dropdown-menu\" id=\"formLogin\">\n" +
//             "                        <div class=\"row\">\n" +
//             "                            <div class=\"container-fluid\">\n" +
//             "                                <form class=\"\">\n" +
//             "                                    <div class=\"form-group\">\n" +
//             "                                        <label class=\"\">Username</label>\n" +
//             "                                        <input class=\"form-control\" name=\"username\" id=\"username\" type=\"text\">\n" +
//             "                                    </div>\n" +
//             "                                    <div class=\"form-group\">\n" +
//             "                                        <label class=\"\">Password</label>\n" +
//             "                                        <input class=\"form-control\" name=\"password\" id=\"password\" type=\"password\">\n" +
//             "                                        <br class=\"\">\n" +
//             "                                    </div>\n" +
//             "                                    <button type=\"submit\" id=\"btnLogin\" class=\"btn btn-success btn-sm\">Login</button>\n" +
//             "                                </form>\n" +
//             "                            </div>\n" +
//             "                        </div>\n" +
//             "                    </div>\n" +
//             "                </li>\n" +
//             "                <li><a href=\"#\" data-toggle=\"modal\" data-target=\"#modalRegister\" class=\"\">Register</a>\n" +
//             "                </li>\n" +
//             "            </ul>"
//         document.getElementById("nav-login").innerHTML = login
//     }
// }

async function login(evt) {
    evt.preventDefault()
    const credentials = {}
    credentials.username = document.getElementById("username").value
    credentials.password = document.getElementById("password").value
    const options = makeOptionsToken("POST", credentials, true)
    try {
        const response = await fetch(apiRoot + "auth/login", options)
            .then(res => handleErrors(res))

        const token = response.token
        console.log(token)
        const role = response.roles[0]
        console.log(role)
        setLoginState(token, role)
        isLoggedIn = true
    } catch (err) {
        console.log(err)
        document.getElementById("error").innerText = err.message + " - Try again"
    }
}


export function logout(evt) {
    evt.preventDefault()
    setLoginState(null)
    isLoggedIn = false
}

export function setLoginState(token, loggedInAs) {
    if (token) {
        sessionStorage.setItem("token", token)
        if (loggedInAs) {
            sessionStorage.setItem("logged-in-as", loggedInAs)
        }
    } else {
        sessionStorage.clear("token")
        sessionStorage.clear("logged-in-as")
    }
    updateLoginDependentComponents()
}

export function updateLoginDependentComponents() {
    const loggedIn = sessionStorage.getItem("token")
    const loggedInAs = sessionStorage.getItem("logged-in-as")
    // document.getElementById("user-role").innerText = ""
    if (loggedIn) {
        // document.getElementById("user-role").innerText = "Logged in as: " + loggedInAs
        console.log("Logged in as: " + loggedInAs)
    }
    // document.getElementById("logged-in").style.display = loggedIn ? "block" : "none"
    // document.getElementById("page-login").style.display = loggedIn ? "none" : "block"
    // document.getElementById("page-logout").style.display = loggedIn ? "block" : "none"
}