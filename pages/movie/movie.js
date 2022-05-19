import {apiRoot} from "../../settings.js";

const URL = apiRoot + "movies"

export function setupMovieHandlers(){
    loadAllMovies();
    document.getElementById("btn-add-movie").onclick = addMovie;

}

function addMovie(){
    const addPostForm = document.querySelector(".add-post-form")
    const titleValue= document.getElementById("title")
    const categoryValue= document.getElementById("category")
    const lengthValue= document.getElementById("length")
    const descriptionValue= document.getElementById("description")
    const agelimitValue = document.getElementById("age-limit")

    addPostForm.addEventListener("submit", (e) =>{
        e.preventDefault();

        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: titleValue.value,
                category: categoryValue.value,
                length: lengthValue.value,
                description: descriptionValue.value,
                ageLimit: agelimitValue.value
            })
        })
        .then(res=>res.json())
        .then(data=> {
            const dataArr =[];
            dataArr.push(data)
        })
    })
    
}


function loadAllMovies(){
    fetch(URL)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        for(let i = 0; i < data.length; i++) {

            const rows = data.map(u =>
                ` 
            <tr data-id=${u.id}>
            <td>${u.id}</td>
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
        }
    })
    .catch(err => console.log("Error: " +  err))
    .finally(err => console.log("Done"));

}

export function getParams(match){
    const movieId = match?.params?.id
    console.log(movieId)
    return movieId
}
