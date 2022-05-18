import {handleErrors, makeOptionsToken} from "../../fetchUtils.js";
import {apiRoot} from "../../settings.js";
import {showPage} from "../../utility.js";


export function setupRegisterHandlers() {
    document.getElementById("submit-register").onclick = register

}

async function register(evt) {
    evt.preventDefault()
    if (document.getElementById("new-password").value === document.getElementById("re-new-password").value) {
        const newCredentials = {}
        newCredentials.username = document.getElementById("new-username").value
        newCredentials.email = document.getElementById("new-email").value
        newCredentials.password = document.getElementById("new-password").value
        const options = makeOptionsToken("POST", newCredentials, false)
        try {
            const response = await fetch(apiRoot + "users", options)
                .then(res => handleErrors(res))

            console.log(response)
            showPage("page-login")

        } catch (err) {
            console.log(err)
            document.getElementById("reg-error").innerText = err.message + " - Try again"
        }
    } else {
        document.getElementById("reg-error").innerText = "Passwords do not match - Try again"
    }

}