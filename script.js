const seriesURL = "https://api.cricapi.com/v1/series?apikey=1dbee094-f2c8-4910-9908-786cf17cb523&offset=0"; 
const tempBtn = document.querySelector(".temp");
let seriesConatiner = document.querySelector(".series-container")
// seriesConatiner.innerHTML = ""

tempBtn.addEventListener("click", async ()=>{
    let responce = await fetch(seriesURL);
    let data = await responce.json()
    seriesConatiner.innerHTML = "" 
    // console.log(data);
    data = data["data"]
    let seriesId = []
    for(let i = 0; i < data.length; i++){
        // console.log(data[i]);
        let curerntSeries = data[i];
        seriesId[i] = curerntSeries["id"]
        let scoreCard = document.createElement("section")
        scoreCard.classList.add("score-card")
        scoreCard.id = `${curerntSeries["id"]}`
        scoreCard.innerHTML = ` <h2>${curerntSeries["name"]}</h2>
            <div class="date">
                <div class="start">
                    <p class="head">Start Date</p>
                    <p class="start-date">${curerntSeries["startDate"]}</p>
                </div>
                <div class="end">
                    <p class="head">End Date</p>
                    <p class="end-date">${curerntSeries["endDate"]}</p>
                </div>
            </div>
            <p class="no-of-matches">Number of matches: <span>${curerntSeries["matches"]}</span></p>
            <button class="refresh-btn">Get more info</button>`
            seriesConatiner.prepend(scoreCard);

            scoreCard.querySelector("button").addEventListener("click",() => {
                // console.log(`${scoreCard.id}`);
                seriesConatiner.classList.remove("center");
            })
    }
})