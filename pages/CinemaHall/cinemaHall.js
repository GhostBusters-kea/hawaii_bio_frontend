import {apiRoot} from "../../settings.js";
import {handleHttpErrors} from "../../utility.js";
import{makeOptions} from "../../fetchUtils.js";

const URL = apiRoot + "cinemahall/";

export function clicked(){
    document.getElementById("btn-checkbox").onclick = multipleCheckboxes;
    document.getElementById("btn-checkbox1").onclick = getBoxed;
}
/*
export function seatsReserved(){
    let array = [];

    fetch(URL + "/api/cinemahall/1")
        .then(res => handleHttpErrors(res))
        .then(data => {
            array.push(data);
            console.log(array)

            if (array.length = 1){

            }else{
                console.log("not found")
            }
        })

}

 */


export function seatsReserved(){
    let array = [];

    fetch(URL + 1)
        .then(res => handleHttpErrors(res))
        .then(data => {
            console.log(data)
            array.push(data);
            if (data.seat){
                chks1.checked = true
                chks2.checked = true
            }else{
                console.log("not found")
            }
        })

}

function multipleCheckboxes(){
    var array = [];

    var tblSeat = document.getElementById("seatsBlock");

    var chks = tblSeat.getElementsByTagName("INPUT")

    for(var i = 0; i < chks.length; i++){
        if(chks[i].checked){
            array.push(chks[i].value)
        }
    }

    //Stringify the array to json
    /*
    var jsonString = JSON.stringify(array)
    console.log(jsonString)
     */


    if(array.length > 0){
        document.getElementById("numberDisplay").innerHTML = array.length
        document.getElementById("seatsDisplay").innerHTML = array.toString()
    }

    //Skal bruges som array til at sende alle sæder til database
    for(var i = 0; i < array.length; i++) {
        if (array.length > 0) {
            const listOfChecked = array[i].toString()
            console.log(listOfChecked)
        }
    }
}


function getBoxed(){

    let tblSeat = document.getElementById("seatsBlock");

    let chks = tblSeat.getElementsByTagName("INPUT")

    for(let i = 0; i < chks.length; i++){
        if(chks[i].checked){
            const chId = chks[i].id
            console.log(chId)
            const chValue = chks[i].value = 1
            console.log(chValue)

                fetch("http://localhost:8090/api/seat/" + chId, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        id : chId,
                        isReserved: chValue
                    })
                })
                    .then(data => {
                        chks.checked = true
                    })
        }
    }
}

//lav flere isReserved, så is_reserved_c1, is_reserved_c2
//hent id fra cinemahall der passer med filmen og gør is_Reserved_ + cinemahallid
//Lav måske foreign keys fra
/*
export function helloKitty(){
    console.log("helo")
    let tblSeat = document.getElementById("seatsBlock");

    let chks = tblSeat.getElementsByTagName("INPUT")

    for(let i = 0; i < chks.length; i++){
        const chId = chks[i].id
        fetch("http://localhost:8090/api/seat/" + chId, data => {
            console.log(data)
            if(data.isReserved.value == 1){
                chks.id.checked = true
            }
        })
    }
}

 */