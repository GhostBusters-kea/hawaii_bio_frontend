import {apiRoot} from "../../settings.js";
import {handleHttpErrors} from "../../utility.js";

const URL = apiRoot

//Der skal bruges et movieid når man vælger en film. Før jeg kan få de rigtige datoer
export function getAllPerformancesOnMovie(movieid){
    fetch(URL + "/api/performance/" + movieid)
        .then(res => handleHttpErrors(res))
        .then(performances1 => {
            const performanceList = document.getElementById("performanceList")

            for(let i = 0; i < performances1.length; i++){
                let performanceOption = document.createElement("option")
                performanceOption.innerText = performances1[i].date
                performanceList.appendChild(performanceOption)
            }
        })
        .catch(res => res.message)
}