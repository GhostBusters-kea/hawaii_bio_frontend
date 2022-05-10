const URL = "http://localhost:8090/api/reservation"

export function setupReservationHandlers(){
    document.getElementById("btn-get-all-reservations").onclick = getReservations;
}

export function getReservations(){
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