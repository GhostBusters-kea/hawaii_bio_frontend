import {apiRoot} from "../../settings.js";


const URL = apiRoot


export function setupTicketHandlers(){
    document.getElementById("view-ticket-btn").onclick = viewTickets;
    document.getElementById("create-ticket").onclick = createTicket;
}

export function createTicket() {
    console.log("Creating ticket initiated")
    const addPostForm = document.querySelector(".create-ticket-form")
    //const id = "7"
    //console.log(id)
    const ticketTypeValue = document.getElementById("ticketTypeChoice").value
    console.log(ticketTypeValue)

    const amountOfTicketsValue = document.getElementById("quantity").value
    console.log(amountOfTicketsValue)

    const ticketPriceValue = "340"
    console.log(ticketPriceValue)

    const url = window.location.href;
    console.log(url)
    const getIdFromUrl = url.substring(url.lastIndexOf('=') + 1);
    console.log(getIdFromUrl);


    const performanceValue = {id: getIdFromUrl}
    console.log(performanceValue)

    addPostForm.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch(URL + "ticket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ticketType: ticketTypeValue,
                amountOfTickets: amountOfTicketsValue,
                ticketPrice: ticketPriceValue,
                performance: performanceValue,
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const newTicketId = {id: data.id}
                const time = new Date("2022-01-10 00:00:00.000000")
                const currentTicketId = data.id
                console.log(newTicketId)
                console.log("VI NÅR HER TIL")

                console.log("ere")

                fetch(URL + "reservation", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        reservationDate: time,
                        ticket: newTicketId,
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                            console.log(data)
                            viewTickets(currentTicketId)

                        }


                        // const dataArr = [];
                        // dataArr.push(data);
                        // console.log("yaya")


                    ) })
    })}



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
    fetch("http://localhost:8090/api/ticket/" + ticketid)
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