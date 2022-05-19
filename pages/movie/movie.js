import {apiRoot} from "../../settings.js";

const URL = apiRoot + "movies"

export function setupMovieHandlers(){
    loadAllMovies();
   
}

function loadAllMovies(){
    fetch(URL)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)

            const rows = data.map(u =>
                ` 
            <tr data-id=${u.id}>
            <td><a id="img-id"></a></td>
            <td>${u.title}</td>
            <td>${u.category}</td>
            <td>${u.length}</td>
            <td>${u.description}</td>
            <td>${u.ageLimit}</td>
            <td><a id="test" class="">Reserve</a></td>
            </tr>
            `
            ).join("\n")
            document.getElementById("movie-tbl-id").innerHTML = rows;

            for (let i = 0; i < data.length; i++) {
                let test = document.getElementById("test")
                test.setAttribute("href", "#/performance?id=" + data[i].id)
                test.id += i
            }

                let image = document.createElement("img");
                image.src=data.imageUrl;
                image.width=200;
                image.height=200;
                const block = document.getElementById("img-id")
                block.appendChild;
                console.log(image.src)
           

        
    })
    .catch(err => console.log("Error: " +  err))
    .finally(err => console.log("Done"));

}





export function getParams(match){
    const movieId = match?.params?.id
    console.log(movieId)
    return movieId
}
