import {apiRoot} from "../../settings.js";
import {handleErrors, makeOptionsToken} from "../../fetchUtils.js";
import {handleHttpErrors} from "../../utility.js";


const URL = apiRoot + "movies"

export function setupMovieHandlers(){
    loadAllMovies();
    if (sessionStorage.getItem("role") === "ADMIN") {
        addMovieHtml()
        addMovie()
    }
}

function addMovieHtml(){
    document.getElementById("add-movie-html").innerHTML = "<div class=\"flexbox-item\">\n" +
        "      <form id=\"form-add-movie\" method=\"post\">\n" +
        "        <div class=\"form-group\">\n" +
        "          <label for=\"new-title\">Title</label>\n" +
        "          <input type=\"text\" class=\"form-control\" id=\"new-title\">\n" +
        "        </div>\n" +
        "        <div class=\"form-group\">\n" +
        "          <label for=\"new-category\">Category</label>\n" +
        "          <input type=\"text\" class=\"form-control\" id=\"new-category\">\n" +
        "        </div>\n" +
        "        <div class=\"form-group\">\n" +
        "          <label for=\"new-length\">Length</label>\n" +
        "          <input type=\"number\" class=\"form-control\" id=\"new-length\" placeholder=\"Length in full minutes\">\n" +
        "        </div>\n" +
        "        <div class=\"form-group\">\n" +
        "          <label for=\"new-age\">Age Limit</label>\n" +
        "          <input type=\"number\" class=\"form-control\" id=\"new-age\">\n" +
        "        </div>\n" +
        "        <div class=\"form-group\">\n" +
        "          <label for=\"new-description\">Description</label>\n" +
        "          <input type=\"text\" class=\"form-control\" id=\"new-description\">\n" +
        "        </div>\n" +
        "\n" +
        "        <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n" +
        "      </form>\n" +
        "    </div>"
}

async function addMovie(){

    const newMovieDetails = {}
    newMovieDetails.title = document.getElementById("new-title").value
    newMovieDetails.category = document.getElementById("new-category").value
    newMovieDetails.length = document.getElementById("new-length").value
    newMovieDetails.ageLimit = document.getElementById("new-age").value
    newMovieDetails.description = document.getElementById("new-description").value

    const options = makeOptionsToken("POST", newMovieDetails, true)
    try{
        const response = await fetch(URL, options)
            .then(res => handleHttpErrors(res))

    } catch (err) {
        console.log(err)
        // document.getElementById("error").innerText = err.message + " - Try again"
    }
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
