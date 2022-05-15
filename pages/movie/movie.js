const URL = "http://localhost:8090/api/movies/"

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