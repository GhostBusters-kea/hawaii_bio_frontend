import {handleHttpErrors, makeOptions} from "../../utility.js";

const URL = "http://localhost:8090/api/"

export async function handleUsers(){
    await getUsers()
}

async function getUsers() {
    try {
        const allUsers = await fetch(URL + 'users', makeOptions("GET"))
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