import {apiRoot} from "../../settings.js";
import {handleHttpErrors} from "../../utility.js";
import{makeOptions} from "../../fetchUtils.js";

const URL = apiRoot;

export function clicked(){
    document.getElementById("btn-checkbox").onclick = multipleCheckboxes;
    document.getElementById("btn-checkbox1").onclick = postMapp;
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

    var chks1 = document.getElementById("A1")
    var chks2 = document.getElementById("A2")
    fetch(URL + "/api/cinemahall/" + 1)
        .then(res => handleHttpErrors(res))
        .then(data => {
            console.log(data)
            array.push(data);
            if (data.a1 == 1 || data.a2 == 1){
                chks1.checked = true
                chks2.checked = true
                console.log(chks1, chks2)
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

/*
function postMapp(){
    const value = 1

    fetch("http://localhost:8090/api/cinemahall", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            id: 1,
            a1: value,
            a2: value,
            seats: 30,
            seatsReserved: 0
        })
    })

}

 */

function postMapp(){
    const value = 1

    fetch("http://localhost:8090/api/cinemahall", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            a1:1,
            a2:1
        })
    }).then(data => console.log(data))
}