const data =
    JSON.parse(
        localStorage.getItem("CPL_DATA")
    ) || structuredClone(window.CPL_DATA);


/* 경기 목록 */

function loadGames() {

    const select =
        document.getElementById("gameSelect");

    select.innerHTML = "";

    data.games.forEach(game => {

        const home =
            data.teams.find(
                team => team.id === game.home
            );

        const away =
            data.teams.find(
                team => team.id === game.away
            );

        const option =
            document.createElement("option");

        option.value = game.id;

        option.textContent =
            `${game.id}차전 | ${home.name} VS ${away.name}`;

        select.appendChild(option);

    });
}


/* 경기 결과 저장 */

function saveGame() {

    const id =
        Number(
            document.getElementById("gameSelect").value
        );

    const game =
        data.games.find(
            game => game.id === id
        );

    game.homeScore =
        Number(
            document.getElementById("homeScore").value
        );

    game.awayScore =
        Number(
            document.getElementById("awayScore").value
        );

    game.status = "종료";

    save();

    alert("⚾ 경기 결과가 저장되었습니다.");
}


/* 일정 저장 */

function saveSchedule() {

    const date =
        document.getElementById("scheduleDate").value;

    const home =
        document.getElementById("scheduleHome").value;

    const away =
        document.getElementById("scheduleAway").value;

    if (!date || !home || !away) {
        alert("모든 정보를 입력해주세요.");
        return;
    }

    data.games.push({

        id: data.games.length + 1,

        date: date,

        home: home,

        away: away,

        homeScore: null,

        awayScore: null,

        status: "예정"

    });

    save();

    alert("📅 일정이 저장되었습니다.");
}


/* 뉴스 저장 */

function saveNews() {

    const title =
        document.getElementById("newsTitle").value;

    const content =
        document.getElementById("newsContent").value;

    data.news.push({

        id: Date.now(),

        category: "뉴스",

        title: title,

        content: content,

        date:
            new Date()
                .toISOString()
                .split("T")[0]

    });

    save();

    alert("📰 뉴스가 등록되었습니다.");
}


/* 팀 목록 */

function loadTeams() {

    const select =
        document.getElementById("teamSelect");

    data.teams.forEach(team => {

        const option =
            document.createElement("option");

        option.value = team.id;

        option.textContent = team.name;

        select.appendChild(option);

    });
}


/* 팀 저장 */

function saveTeam() {

    const id =
        document.getElementById("teamSelect").value;

    const team =
        data.teams.find(
            team => team.id === id
        );

    team.name =
        document.getElementById("teamName").value;

    team.english =
        document.getElementById("teamEnglish").value;

    save();

    alert("👥 팀 정보가 저장되었습니다.");
}


/* 선수 목록 */

function loadPlayers() {

    const select =
        document.getElementById("playerSelect");

    data.players.forEach(player => {

        const option =
            document.createElement("option");

        option.value = player.id;

        option.textContent = player.name;

        select.appendChild(option);

    });
}


/* 선수 저장 */

function savePlayer() {

    const id =
        document.getElementById("playerSelect").value;

    const player =
        data.players.find(
            player => player.id === id
        );

    player.name =
        document.getElementById("playerName").value;

    player.number =
        Number(
            document.getElementById("playerNumber").value
        );

    player.position =
        document.getElementById("playerPosition").value;

    save();

    alert("👤 선수 정보가 저장되었습니다.");
}


/* 저장 */

function save() {

    localStorage.setItem(
        "CPL_DATA",
        JSON.stringify(data)
    );

}


/* 시작 */

loadGames();
loadTeams();
loadPlayers();
