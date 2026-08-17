/* =========================================
   CPL 2026 관리자
   ========================================= */

let cplData = loadData();


/* =========================================
   데이터 불러오기
   ========================================= */

function loadData() {

    const saved =
        localStorage.getItem("CPL_DATA");

    if (saved) {
        return JSON.parse(saved);
    }

    return JSON.parse(
        JSON.stringify(window.CPL_DATA)
    );
}


/* =========================================
   데이터 저장
   ========================================= */

function saveData() {

    localStorage.setItem(
        "CPL_DATA",
        JSON.stringify(cplData)
    );

}


/* =========================================
   경기 목록
   ========================================= */

function loadGames() {

    const select =
        document.getElementById("gameSelect");

    if (!select) return;

    select.innerHTML = "";

    cplData.games.forEach(game => {

        const home =
            cplData.teams.find(
                team => team.id === game.home
            );

        const away =
            cplData.teams.find(
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


/* =========================================
   경기 결과 저장
   ========================================= */

function saveGame() {

    const gameId =
        Number(
            document.getElementById(
                "gameSelect"
            ).value
        );

    const homeScoreInput =
        document.getElementById(
            "homeScore"
        ).value;

    const awayScoreInput =
        document.getElementById(
            "awayScore"
        ).value;


    if (
        homeScoreInput === "" ||
        awayScoreInput === ""
    ) {

        alert("⚾ 두 팀의 점수를 모두 입력해주세요.");

        return;

    }


    const homeScore =
        Number(homeScoreInput);

    const awayScore =
        Number(awayScoreInput);


    if (
        homeScore < 0 ||
        awayScore < 0
    ) {

        alert("점수는 0 이상이어야 합니다.");

        return;

    }


    const game =
        cplData.games.find(
            game => game.id === gameId
        );


    if (!game) {

        alert("경기를 찾을 수 없습니다.");

        return;

    }


    game.homeScore = homeScore;
    game.awayScore = awayScore;
    game.status = "종료";


    saveData();


    alert(
        `⚾ ${gameId}차전 결과가 저장되었습니다.\n\n` +
        `${homeScore} : ${awayScore}`
    );

}


/* =========================================
   팀 목록
   ========================================= */

function loadTeams() {

    const select =
        document.getElementById(
            "teamSelect"
        );

    if (!select) return;

    select.innerHTML = "";

    cplData.teams.forEach(team => {

        const option =
            document.createElement(
                "option"
            );

        option.value = team.id;
        option.textContent =
            `${team.logo} ${team.name}`;

        select.appendChild(option);

    });

}


/* =========================================
   팀 정보 불러오기
   ========================================= */

function loadTeamInfo() {

    const select =
        document.getElementById(
            "teamSelect"
        );

    if (!select) return;

    const team =
        cplData.teams.find(
            team => team.id === select.value
        );

    if (!team) return;


    document.getElementById(
        "teamName"
    ).value = team.name;

    document.getElementById(
        "teamEnglish"
    ).value = team.english;

}


/* =========================================
   팀 정보 저장
   ========================================= */

function saveTeam() {

    const id =
        document.getElementById(
            "teamSelect"
        ).value;

    const team =
        cplData.teams.find(
            team => team.id === id
        );


    if (!team) return;


    const name =
        document.getElementById(
            "teamName"
        ).value.trim();

    const english =
        document.getElementById(
            "teamEnglish"
        ).value.trim();


    if (!name || !english) {

        alert("팀 이름과 영문 이름을 입력해주세요.");

        return;

    }


    team.name = name;
    team.english = english;


    saveData();


    alert("👥 팀 정보가 저장되었습니다.");

}


/* =========================================
   선수 목록
   ========================================= */

function loadPlayers() {

    const select =
        document.getElementById(
            "playerSelect"
        );

    if (!select) return;

    select.innerHTML = "";

    cplData.players.forEach(player => {

        const option =
            document.createElement(
                "option"
            );

        option.value = player.id;
        option.textContent =
            player.name;

        select.appendChild(option);

    });

}


/* =========================================
   선수 정보 불러오기
   ========================================= */

function loadPlayerInfo() {

    const select =
        document.getElementById(
            "playerSelect"
        );

    if (!select) return;


    const player =
        cplData.players.find(
            player => player.id === select.value
        );

    if (!player) return;


    document.getElementById(
        "playerName"
    ).value = player.name;

    document.getElementById(
        "playerNumber"
    ).value = player.number;

    document.getElementById(
        "playerPosition"
    ).value = player.position;

}


/* =========================================
   선수 정보 저장
   ========================================= */

function savePlayer() {

    const id =
        document.getElementById(
            "playerSelect"
        ).value;


    const player =
        cplData.players.find(
            player => player.id === id
        );


    if (!player) return;


    player.name =
        document.getElementById(
            "playerName"
        ).value.trim();


    player.number =
        Number(
            document.getElementById(
                "playerNumber"
            ).value
        );


    player.position =
        document.getElementById(
            "playerPosition"
        ).value.trim();


    saveData();


    alert("👤 선수 정보가 저장되었습니다.");

}


/* =========================================
   뉴스 등록
   ========================================= */

function saveNews() {

    const title =
        document.getElementById(
            "newsTitle"
        ).value.trim();


    const content =
        document.getElementById(
            "newsContent"
        ).value.trim();


    if (!title || !content) {

        alert("뉴스 제목과 내용을 입력해주세요.");

        return;

    }


    cplData.news.push({

        id: Date.now(),

        category: "공지",

        title: title,

        content: content,

        date:
            new Date()
                .toISOString()
                .split("T")[0]

    });


    saveData();


    document.getElementById(
        "newsTitle"
    ).value = "";


    document.getElementById(
        "newsContent"
    ).value = "";


    alert("📰 뉴스가 등록되었습니다.");

}


/* =========================================
   일정 추가
   ========================================= */

function saveSchedule() {

    const date =
        document.getElementById(
            "scheduleDate"
        ).value;


    const home =
        document.getElementById(
            "scheduleHome"
        ).value.trim();


    const away =
        document.getElementById(
            "scheduleAway"
        ).value.trim();


    if (!date || !home || !away) {

        alert("날짜와 두 팀을 입력해주세요.");

        return;

    }


    cplData.games.push({

        id:
            cplData.games.length + 1,

        date: date,

        home: home,

        away: away,

        homeScore: null,

        awayScore: null,

        status: "예정"

    });


    saveData();


    alert("📅 일정이 저장되었습니다.");

    loadGames();

}


/* =========================================
   시작
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadGames();

        loadTeams();

        loadPlayers();


        const teamSelect =
            document.getElementById(
                "teamSelect"
            );

        if (teamSelect) {

            teamSelect.addEventListener(
                "change",
                loadTeamInfo
            );

            loadTeamInfo();

        }


        const playerSelect =
            document.getElementById(
                "playerSelect"
            );

        if (playerSelect) {

            playerSelect.addEventListener(
                "change",
                loadPlayerInfo
            );

            loadPlayerInfo();

        }

    }
);
