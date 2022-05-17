import {handleHttpErrors} from "../../utility.js";
import {apiRoot} from "../../settings";
import {makeOptions} from "../../fetchUtils";

const URL = apiRoot + "users"

export async function handleUsers(){
    await getUsers()
}

async function getUsers() {
    try {
        const allUsers = await fetch(URL, makeOptions("GET"))
            .then(handleHttpErrors)
            .then(users => { return users })
            console.log(allUsers)
    } catch (err) {
        console.error((err.message))
        if (err.apiError) {
            console.error("Full API error: ", err.apiError)
        }
    }
}