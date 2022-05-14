const URL = "http://localhost:8090/api/movies"

export function loadAllMovies(){
    fetch(URL)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        const rows = data.map(u=>
            ` 
            <tr>
            <td>${u.title}</td>
            <td>${u.category}</td>
            <td>${u.length}</td>
            <td>${u.description}</td>
            <td>${u.ageLimit}</td>
            </tr>
            `            
            ).join("\n")
            document.getElementById("movie-tbl-id").innerHTML=rows;
    })
    .catch(err => console.log("Error: " +  err))
    .finally(err => console.log("Done"));
}