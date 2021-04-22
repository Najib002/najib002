const base_url = "https://api.football-data.org/v2";
const options = "6d90ae78ded24713a5484a73c6025fbf";

const fetchingAPI = url => {
    return fetch(url, {
      headers: {
        'X-Auth-Token': options
      }
    })
    .then(res => {
      if (res.status !== 200) {
        console.log("Error: " + res.status);
        return Promise.reject(new Error(res.statusText))
      } else {
        return Promise.resolve(res)
      }
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
  };

function getCompetition() {
    fetchingAPI(`${base_url}/competitions?plan=TIER_ONE`)
    .then(function(data) {
        setCompetition(data);
    })
    .catch(function(err) {
        console.error(err);
    });
}

function setCompetition(data) {
    let competitionHTML = document.getElementById("comp");
    data.competitions.forEach(function(competition) {
        competitionHTML.innerHTML += `
            <tr onclick="window.location.href='./standings.html?id=${competition.id}'">
                <td>${competition.area.name}</td>
                <td>${competition.name}</td>
                <td>${competition.currentSeason.startDate}</td>
                <td>${competition.currentSeason.endDate}</td>
            </tr>
        `;
        document.getElementById('progress').style.display = 'none';
    });
}

function getSavedCompetitions() {
    getAllCompetitions().then(function(competition) {
        let competitionHTML = "";
        competition.forEach(function(comp) {
            if(comp.id > 0) {
                competitionHTML += `
                    <tr onclick="window.location.href='./standings.html?id=${comp.id}&saved=true'">
                        <td>${comp.area.name}</td>
                        <td>${comp.name}</td>
                        <td>${comp.lastUpdated.substring(0, 10)}</td>
                    </tr>
                `;
            }
        });
        document.getElementById("savedComp").innerHTML = competitionHTML;
    });
}

function getStandingsById() {
    return new Promise ((resolve, reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        fetchingAPI(`${base_url}/competitions/${idParam}/standings`)
        .then(function(data) {
            document.getElementById('progress').style.display = 'none';
            getStandings(data);
            resolve(data)
        })
        .catch(function(err) {
            console.error(err);
        });
    });
}

function getStandings(data) {     
    let standings = "";
    let contentStandings = document.getElementById("body-content");
    
    data.standings[0].table.forEach(function(val) {
        let source_logo = "";
        if(val.team.crestUrl === ""){
            source_logo += "/assets/noimage/a.png";
           }else{
            source_logo += (val.team.crestUrl!==null)?val.team.crestUrl.replace(/^http:\/\//i, 'https://'):
                            './assets/noimage/a.png';
           }
            standings += `
                <tr>
                    <td><img src="${source_logo}" onerror="this.src='/assets/noimage/a.png'" 
                        width="30" alt="Logo ${val.team.name}">
                    </td>
                    <td>${val.team.name}</td>
                    <td>${val.won}</td>
                    <td>${val.lost}</td>
                    <td>${val.draw}</td>
                    <td>${val.playedGames}</td>
                    <td>${val.goalsFor}</td>
                    <td>${val.goalDifference}</td>
                    <td>${val.goalsAgainst}</td>
                    <td>${val.points}</td>
                </tr>
            `;
    });
    contentStandings.innerHTML = `
        <div class="card z-depth-3">
            <div class="card-title">
                <h3 class="center">${data.competition.name}</h3>
                <hr>
            </div>
            <table class="responsive-table highlight centered">
                <thead class="indigo darken-4 white-text centered">
                    <tr>
                        <th>GROUP</th>
                        <th>Team</th>
                        <th>W</th>
                        <th>L</th>
                        <th>D</th>
                        <th>PG</th>
                        <th>GF</th>
                        <th>GD</th>
                        <th>GA</th>
                        <th>Pts</th>
                    </tr>
                </thead>
                <tbody>
                    ${standings}
                </tbody>
            </table>
        </div>
    `;
}

function getMatches() {
    fetchingAPI(`${base_url}/competitions/2001/matches?status=FINISHED`)
    .then(function(data) {
        let contentSchedules = document.getElementById("scores");
        let titleSchedules = document.getElementById("title");
            titleSchedules.innerHTML += data.competition.name;

            data.matches.map(function(val) {
            contentSchedules.innerHTML += `
                <tr>
                    <td class="center opening">${val.homeTeam.name}</td>
                    <td class="center">${val.score.fullTime.homeTeam}</td>
                    <td class="center">VS</td>
                    <td class="center">${val.score.fullTime.awayTeam}</td>
                    <td class="center opening">${val.awayTeam.name}</td>
                </tr>
                `; 
                document.getElementById('progress').style.display = 'none';
        });
    })
    .catch(function(err) {
        console.log(err);
    });
}

function getTeams() {
    fetchingAPI(`${base_url}/teams`)
    .then(function(data) {
        let contentTeams = document.getElementById("teams");
        let progress = document.getElementById('progress');
        progress.style.display = 'none';

        data.teams.forEach(function(team) {
            let source_logo = "";
            if(team.id === 322 || team.id === 351 || team.crestUrl === ""){
                source_logo += "/assets/noimage/a.png";
               }else{
                source_logo += (team.crestUrl!==null)?team.crestUrl.replace(/^http:\/\//i, 'https://'):
                              "/assets/noimage/a.png";
               }
            contentTeams.innerHTML += `
                    <div class="col s12 m4 l4">
                        <div class="card sticky-action z-depth-1 hoverable">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator responsive-img" src="${source_logo}" 
                                style="max-height: 90px; max-width: auto;" alt="badge ${team.name}">
                            </div>
                            <div class="card-content">
                                <span class="card-title activator">
                                    <h5 style="font-size: 18px;" class="activator">
                                        ${team.name.substring(0, 23)}<i class="material-icons right">more_vert</i>
                                    </h5>
                                </span>
                            </div>
                            <div class="card-action">
                                <a href="${team.website}" target="new">${team.shortName}</a>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td>Short name</td>
                                            <td>:</td>
                                            <td>${team.shortName}</td>
                                        </tr>
                                        <tr>
                                            <td>Venue</td>
                                            <td>:</td>
                                            <td>${team.venue}</td>
                                        </tr>
                                        <tr>
                                            <td>Address</td>
                                            <td>:</td>
                                            <td>${team.address}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone</td>
                                            <td>:</td>
                                            <td>${team.phone}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>:</td>
                                            <td>${team.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Club colors</td>
                                            <td>:</td>
                                            <td>${team.clubColors}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            `;
        });
    })
    .catch(function(err) {
        console.log(err);
    })
}