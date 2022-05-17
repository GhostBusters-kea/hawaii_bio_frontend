import { apiRoot } from "../../settings.js"
import { handleErrors, makeOptionsToken } from "../../fetchUtils.js"


export function setupLoginHandlers() {
    document.getElementById("submit-login").onclick = login
    // document.getElementById("log-out-btn").onclick = logout
}


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
        const roles = response.roles
        console.log(roles)
        setLoginState(token, roles)

    } catch (err) {
        console.log(err)
        document.getElementById("error").innerText = err.message + " - Try again"
    }
}


export function logout() {
    setLoginState(null)
}

export function setLoginState(token, roles) {
    if (token) {
        sessionStorage.setItem("token", token)
        if (roles.includes('ADMIN')) {
            sessionStorage.setItem("role", 'ADMIN')
        }
        else  {
            sessionStorage.setItem("role", 'USER')
        }
    } else {
        sessionStorage.clear("token")
        sessionStorage.clear("role")
    }
    updateLoginDependentComponents()
}

export function updateLoginDependentComponents() {
    const loggedIn = sessionStorage.getItem("token")
    const loggedInAs = sessionStorage.getItem("role")

    if (loggedIn) {
        console.log("Logged in as: " + loggedInAs)
    }
    document.getElementById("myPage").style.display = loggedIn ? "block" : "none"
    document.getElementById("login").style.display = loggedIn ? "none" : "block"
    document.getElementById("logout").style.display = loggedIn ? "block" : "none"
    document.getElementById("register").style.display = loggedIn ? "none" : "block"
}