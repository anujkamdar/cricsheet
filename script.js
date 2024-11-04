const seriesURL = "https://api.cricapi.com/v1/series?apikey=1dbee094-f2c8-4910-9908-786cf17cb523&offset=0"; 
const tempBtn = document.querySelector(".temp");
let seriesConatiner = document.querySelector(".series-container")
// seriesConatiner.innerHTML = ""
const detailedInfo = document.createElement("div");
detailedInfo.classList.add("detailed-info");

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

            scoreCard.querySelector("button").addEventListener("click", async () => {
                let seriesInfoUrl = `https://api.cricapi.com/v1/series_info?apikey=1dbee094-f2c8-4910-9908-786cf17cb523&id=${scoreCard.id}`
                let seriesResponse = await fetch(seriesInfoUrl)
                let seriesData = await seriesResponse.json()
                seriesData = seriesData["data"]
                let seriesDataInfo = seriesData["info"];
                let seriesDataMatchList = seriesData["matchList"];
                console.log(seriesData);
                console.log(seriesDataMatchList);
                let completedMatchesNo = 0;
                for(let match of seriesDataMatchList){
                    if(match["matchEnded"] == true){
                        completedMatchesNo++;
                    }
                }
                detailedInfo.innerHTML = ` <h2 class="series-name">${seriesDataInfo["name"]}</h2>
                <div class="series-dates">
                    <div class="date-card">
                        <div class="date-label">Start Date</div>
                        <div class="date-value">${seriesDataInfo["startdate"]}</div>
                    </div>
                    <div class="date-card">
                        <div class="date-label">End Date</div>
                        <div class="date-value">${seriesDataInfo["enddate"]}</div>
                    </div>
                </div>
                <div class="series-stats">
                    <div class="stat-card">
                        <div class="stat-label">Total Matches</div>
                        <div class="stat-value">${seriesDataInfo["matches"]}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Completed</div>
                        <div class="stat-value">${completedMatchesNo}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Upcoming</div>
                        <div class="stat-value">${seriesDataInfo["matches"] - completedMatchesNo}</div>
                    </div>
                </div>
                <div class="match-formats">
                    <div class="match-format">
                        <p>ODI <span class="format-count">${seriesDataInfo["odi"]}</span></p>
                    </div>
                    <div class="match-format">
                        <p>T20 <span class="format-count">${seriesDataInfo["t20"]}</span></p>
                    </div>  
                    <div class="match-format">
                        <p>Test <span class="format-count">${seriesDataInfo["test"]}</span></p>
                    </div>
                </div>`;
                document.querySelector(".grid").classList.remove("center")
                document.querySelector(".grid").append(detailedInfo);
                let matches = document.createElement("div")
                matches.classList.add("matches");
                for(let match of seriesDataMatchList){
                    let matchDetails = document.createElement("div");
                    matchDetails.classList.add("match-details")
                    console.log(match);
                    matchDetails.innerHTML = `                    
                    <div class="match-header">
                        <div class="match-name">${match["name"]}</div>
                    </div>
                    <div class="match-info">
                        <div class="info-box">
                            <div class="info-label">Venue</div>
                            <div class="info-value">${match["venue"]}</div>
                        </div>
                        <div class="info-box">
                            <div class="info-label">Date</div>
                            <div class="info-value">${match["date"]}</div>
                        </div>
                        <div class="info-box">
                            <div class="info-label">Time</div>
                            <div class="info-value">${match["dateTimeGMT"]}</div>
                        </div>
                    </div>`
                    // console.log(matchDetails);
                    matches.append(matchDetails);
                }
                detailedInfo.append(matches);
            })
    }
})