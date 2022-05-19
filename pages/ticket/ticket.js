import {apiRoot} from "../../settings.js";


const URL = apiRoot


export function setupTicketHandlers(){
    document.getElementById("view-ticket-btn").onclick = viewTickets;
}



//     function selectOption(){
// const optionToChose = document.querySelectorAll("select")
//     console.log(optionToChose)
//         const amountOfTicketValue = document.getElementById("ticket-q").selectedIndex.valueOf()
//         console.log(amountOfTicketValue)
//
//         const value = optionToChose.options[optionToChose.selectedIndex[optionToChose].valueOf()]
// }
//
// function handleSelect(ev){
//     let select = ev.target;
//     console.log(select.value);
//     let choice = [];
//     choice = [].map.call(select.selectedOptions, (option) => option.value);
//     console.log(choice)
// }

// function handleData(ev){
//     let finalInput = ev.target;
//     console.log(finalInput)
// }
// function testIgen(){
// const btn = document.querySelector('#reserve-ticket');
// const sb = document.querySelector('#ticket-q')
// btn.onclick = (event) => {
//     event.preventDefault();
//     // show the selected index
//     alert(sb.selectedIndex).value;
// }};

export function viewTickets(ticketid){

    document.getElementById("ticket-movie-image").innerText = "";
    const id = document.getElementById("ticket-id").value;
    //const id = document.getElementById("ticket-id").value
    console.log(id)
    fetch(URL+ "ticket/" + ticketid)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let image = document.createElement("img");
            image.src = data.performance.movie.imageUrl;
            image.width = 350;
            image.height = 350;
            const block = document.getElementById("ticket-movie-image");
            block.appendChild(image);
            console.log(image.src)

            document.getElementById("ticket-movie-title").innerHTML = (data.performance.movie.title);
            document.getElementById("hall").innerHTML;
            document.getElementById("ticket-date").innerHTML = (data.performance.date);
            document.getElementById("ticket-view-type").innerHTML = (data.ticketType);
            document.getElementById("ticket-length").innerHTML = (data.performance.movie.length) + " minutes";
            document.getElementById("ticket-price").innerHTML = (data.ticketPrice);
            document.getElementById("age-limit").innerHTML = (data.performance.movie.ageLimit);


        })

        .catch(err => console.log("OOOPPs: " + err))
        .finally(err => console.log("Done"))
}

//Cinemahall javascript

export function seatsReserved(performanceid){
    console.log("hello")

    let tblSeat = document.getElementById("seatsBlock");
    let chks = tblSeat.getElementsByTagName("INPUT")


    fetch (URL +"performanceseat/" + performanceid)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.map((data)=>{
                const getIdFromSeat = data.seat.id
                console.log(getIdFromSeat)

                if (data.isreserved = 1) {
                    chks[getIdFromSeat -1].checked = true
                }
            })
        })
}

export function reserveSeats(performanceid){
    document.getElementById("btn-checkbox").addEventListener("click", ()=> {

        let tblSeat = document.getElementById("seatsBlock");

        let chks = tblSeat.getElementsByTagName("INPUT")

        const time = new Date("2022-01-10 00:00:00.000000")
        const userId = "1"


        fetch(URL + "reservation", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                reservationDate: time,
                user: userId,
            })
        })
            .then(res=> res.json())
            .then(data => {
                const reservationId = {id: data.id}



        for(let i = 0; i < chks.length; i++){
            if(chks[i].checked){
                const chId = chks[i].id
                console.log(chId)
                const chValue = chks[i].value = 1
                console.log(chValue)

                const ticketPriceValue = "200"


                const valueId = {id: chId}
                const valuePerformance = {id: performanceid}


                fetch(URL + "performanceseat/", {
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
                }).then(() => {
                            //const reservationId = {id: data.id}
                            fetch(URL + "ticket/", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    ticketPrice: ticketPriceValue,
                                    performance: valuePerformance,
                                    seatname: chId,
                                    reservation: reservationId
                                })
                            })
                        })

                }
            }
        })
    })
}