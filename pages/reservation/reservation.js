

const URL = "http://localhost:8090/api/reservation"

export function setupReservationHandlers(){
    document.getElementById("btn-get-id-reservation").onclick = getReservations;
    document.getElementById("delete-reservation-btn").onclick = delete2;

}



export function getReservations(){
    document.getElementById("tbl-id-reservation").innerHTML="";

    const id = document.getElementById("input-reservation-id").value
    console.log(id)
    if (id === ""){
    fetch(URL)
        .then(res => res.json())
        .then(data => {

            console.log(data)
            const rows = data.map(u=>
                `
        <tr>
            <td>${u.id}</td>
            <td>${u.reservationDate}</td>
            <td>${u.ticketResponse.dateOfPerformance.movie.title}</td>
            <td>1</td>
            <td>${u.ticketResponse.dateOfPerformance.date}</td>
            <td>${u.ticketResponse.dateOfPerformance.movie.ageLimit}</td>
            <td>${u.ticketResponse.amountOfTickets}</td>
            <td>${u.ticketResponse.ticketPrice}</td>
            
        </tr>    
        `).join("\n")
            document.getElementById("tbl-id-reservation").innerHTML=rows;

        })

        .catch(err => console.log("OOOPPs: " + err))
        .finally(err => console.log("Done"))
}
else {
        fetch(URL + "/" + id)
            .then(res => res.json())
            .then(data => {

                console.log(data)
                document.getElementById("reservation-id").innerText = (data.id);
                document.getElementById("reservation-created").innerHTML = (data.reservationDate);
                document.getElementById("reservation-movie").innerHTML = (data.ticketResponse.dateOfPerformance.movie.title);
                document.getElementById("reservation-cinema-hall").innerHTML = "1";
                document.getElementById("reservation-dateOfPerformance").innerHTML = (data.ticketResponse.dateOfPerformance.date);
                document.getElementById("reservation-ageLimit").innerHTML = (data.ticketResponse.dateOfPerformance.movie.ageLimit);
                document.getElementById("reservation-amountOfTickets").innerHTML = (data.ticketResponse.amountOfTickets);
                document.getElementById("reservation-totalPrice").innerHTML = (data.ticketResponse.ticketPrice);
                let btn = document.getElementById("update-reservation-btn");
                btn.style.display = "block";
                let deleteBtn = document.getElementById("delete-reservation-btn");
                deleteBtn.style.display = "block";
            })

            .catch(err => console.log("OOOPPs: " + err))
            .finally(err => console.log("Done"))
    }

}


function deleteReservation(){
    const idValue = document.getElementById("reservation-id").value
    const reservationCreated = document.getElementById("reservation-created")
    const movieValue = document.getElementById("reservation-movie")
    const cinemaHallValue = document.getElementById("reservation-cinema-hall")
    const dateOfPerformanceValue = document.getElementById("reservation-dateOfPerformance")
    const ageLimitValue = document.getElementById("reservation-ageLimit")
    const amountOfTicketsValue = document.getElementById("reservation-amountOfTickets")
    const totalPriceValue = document.getElementById("reservation-totalPrice")

    const addPostForm = document.querySelector(".reservation-tr")
    addPostForm.addEventListener("click", (e)=> {
        e.preventDefault();
        let deleteButtonPressed = e.target.id == "delete-reservation-btn"

        let id = e.target.parentElement.parentElement.dataset.id;
        console.log(id)

        if (deleteButtonPressed) {
            fetch(URL + id, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(()=> location.reload())
            console.log("eeee")
        }


    })
}

function delete1(){
    let id = document.getElementById("input-reservation-id").value
    fetch(URL + "/" + id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.getElementById("reservation-id").innerText = (data.id);
        })
        .catch(err => console.log("OOOPPs: " + err))
        .finally(err => console.log("Done"))


    const addPostForm = document.querySelector(".btn-1")
    let idd = document.getElementById("reservation-id").value;
    console.log(idd)
    addPostForm.addEventListener("click", (e)=> {
        e.preventDefault();
    let deletePressed = document.getElementById("delete-reservation-btn")
   // let id = e.target.parentElement.parentElement.dataset.id;
    if (deletePressed) {
        fetch(URL + "/" + idd, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(()=> location.toString())
        console.log("eeee")
    }
})}

function delete2 (){
    try {
    let id = document.getElementById("input-reservation-id").value
    fetch(URL + "/" + id, {
        method: "DELETE",
    })
        .then(res => res.json())
        .then(()=> location.reload())
    console.log("eeee")
    }
    catch (err){
        console.log('error', err)
    }
}

