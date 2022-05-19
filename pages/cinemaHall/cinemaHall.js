import {apiRoot} from "../../settings.js";
import {handleHttpErrors} from "../../utility.js";
import{makeOptions} from "../../fetchUtils.js";

const URL = apiRoot;

export function seatsReserved(performanceid){
    console.log("hello")

    const performanceseatid = 2

    let tblSeat = document.getElementById("seatsBlock");
    let chks = tblSeat.getElementsByTagName("INPUT")


    fetch ("http://localhost:8090/api/performanceseat/" + performanceseatid)
        .then(res => res.json())
        .then(data => {
        console.log(data)
            data.map((data)=>{
                const getIdFromSeat = data.seat.id
                console.log(getIdFromSeat)

                    if (data.isreserved = 1) {
                        console.log("Jeg er her")
                        chks[getIdFromSeat -1].checked = true
                    }
            })
            })
}

export function reserveSeats(performanceid){
    document.getElementById("btn-checkbox").addEventListener("click", ()=> {
        console.log("hello")
        const performanceidHardcode = 2

        let tblSeat = document.getElementById("seatsBlock");

        let chks = tblSeat.getElementsByTagName("INPUT")

        for(let i = 0; i < chks.length; i++){
            if(chks[i].checked){
                const chId = chks[i].id
                console.log(chId)
                const chValue = chks[i].value = 1
                console.log(chValue)

                const valueId = {id: chId}
                const valuePerformance = {id: performanceidHardcode}


                fetch("http://localhost:8090/api/performanceseat/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        performance: valuePerformance,
                        isreserved: chValue,
                        seat: valueId
                    })
                })
            }
        }
    })
}
