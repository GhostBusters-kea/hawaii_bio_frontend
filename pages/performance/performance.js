import {apiRoot} from "../../settings.js";
import {handleHttpErrors} from "../../utility.js";

const URL = apiRoot

//Der skal bruges et movieid når man vælger en film. Før jeg kan få de rigtige datoer
export function getAllPerformancesOnMovie(movieid){
    fetch(URL + "/api/performance/" + movieid)
        .then(res => handleHttpErrors(res))
        .then(performances1 => {
            const performanceList = document.getElementById("performanceList")

            for(let i = 0; i < performances1.length; i++){
                let performanceOption = document.createElement("option")
                performanceOption.innerText = performances1[i].date
                performanceList.appendChild(performanceOption)
            }
        })
        .catch(res => res.message)
}
//
// export function createImage(id){
//
//     const img = document.createElement('img');
//     img.src =
//         'https://media.geeksforgeeks.org/wp-content/uploads/20190529122828/bs21.png';
//     document.getElementById('image').appendChild(img);
//     img.setAttribute(id, 1);
//
//     console.log(img.getAttribute(id))
//
//     document.getElementById("image").addEventListener("click", function(){
//         const id2 = document.getElementById("image").value
//
//         console.log(id)
//     })
// }

export function loadAllPerformances(movieid){
    fetch(URL + "/api/performance/" + movieid)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            for(let i = 0; i < data.length; i++) {

                const rows = data.map(u =>
                    ` 
            <tr data-id=${u.id}>
            <td>${u.id}</td>
            <td>${u.date}</td>
            
            <td><a id="test-performance" class="">Click</a></td>
            </tr>
            `
                ).join("\n")
                document.getElementById("performance-tbl-id").innerHTML = rows;

                for (let i = 0; i < data.length; i++) {
                    let test = document.getElementById("test-performance")
                    test.setAttribute("href", "#/ticket?id=" + data[i].id)
                    test.id += i
                }
            }
        })
        .catch(err => console.log("Error: " +  err))
        .finally(err => console.log("Done"));

}