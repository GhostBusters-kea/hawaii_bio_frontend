import {apiRoot} from "../../settings.js";
import {makeOptionsToken} from "../../fetchUtils.js";

const URL = apiRoot

export function setupMyPageHandlers() {

}

async function fetchUserReservations() {
    const options = makeOptionsToken("GET",null, true)

    try {
        const response = await fetch(apiRoot + "")

    } catch (err) {
        console.log(err)
    }

}