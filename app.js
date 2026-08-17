/* =========================================
   CPL 2026 APP
   ========================================= */

const data = window.CPL_DATA;


/* =========================================
   팀 찾기
   ========================================= */

function getTeam(id) {
    return data.teams.find(team => team.id === id);
}


/* =========================================
   순위 계산
   승리 3점 / 무승부 1점 / 패배 0점
   ========================================= */

function calculateStandings() {

    const standings = {};

    data.teams.forEach(team => {

        standings[team.id] = {
            team: team,
            wins: 0,
            losses: 0,
            draws: 0,
            points: 0
        };

    });


    data.games.forEach(game => {

        if (
            game.homeScore === null ||
            game.awayScore === null
        ) {
            return;
        }


        const home = standings[game.home];
        const away = standings[game.away];


        if (!home || !away) {
            return;
        }


        if (game.homeScore > game.awayScore) {

            home.wins++;
            home.points += 3;

            away.losses++;

        }

        else if (game.homeScore < game.awayScore) {

            away.wins++;
            away.points += 3;

            home.losses++;

        }

        else {

            home.draws++;
            away.draws++;

            home.points++;
            away.points++;

        }

    });


    return Object.values(standings).sort(
        (a, b) => {

            if (b.points !== a.points) {
                return b.points - a.points;
            }

            return b.wins - a.wins;

        }
    );

}


/* =========================================
   날짜 표시
   ========================================= */

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString(
        "ko-KR",
        {
            month: "2-digit",
            day: "2-digit",
            weekday: "short"
        }
    );

}


/* =========================================
   다음 경기
   ========================================= */

function renderNextGame() {

    const element =
        document.getElementById("next-game");

    if (!element) return;


    const next =
        data.games.find(
            game =>
                game.homeScore === null ||
                game.awayScore === null
        );


    if (!next) {

        element.innerHTML =
            "<strong>모든 경기가 종료되었습니다.</strong>";

        return;

    }


    const home = getTeam(next.home);
    const away = getTeam(next.away);


    element.innerHTML = `

        <div class="match">

            <div>
                <strong>
                    ${home.logo} ${home.name}
                </strong>

                <small>홈</small>
            </div>

            <div class="vs">
                VS
            </div>

            <div>
                <strong>
                    ${away.logo} ${away.name}
                </strong>

                <small>원정</small>
            </div>

        </div>

        <div class="match-date">

            ${formatDate(next.date)}
            · ${next.id}차전

        </div>

    `;

}


/* =========================================
   홈 순위
   ========================================= */

function renderHomeStandings() {

    const element =
        document.getElementById("home-standings");

    if (!element) return;


    const standings =
        calculateStandings();


    element.innerHTML =
        standings.map(
            (item, index) => `

            <div>

                <b>${index + 1}</b>

                <span>
                    ${item.team.logo}
                    ${item.team.name}
                </span>

                <strong>
                    ${item.wins}승
                    ${item.losses}패
                    ${item.points}점
                </strong>

            </div>

        `
        ).join("");

}


/* =========================================
   경기 목록
   ========================================= */

function renderGames() {

    const element =
        document.getElementById("games-list");

    if (!element) return;


    element.innerHTML =
        data.games.map(
            game => {

                const home =
                    getTeam(game.home);

                const away =
                    getTeam(game.away);


                let score = "VS";

                if (
                    game.homeScore !== null &&
                    game.awayScore !== null
                ) {

                    score =
                        `${game.homeScore} : ${game.awayScore}`;

                }


                return `

                    <div class="box">

                        <div class="box-title">
                            ${game.id}차전
                        </div>

                        <div class="match">

                            <div>
                                <strong>
                                    ${home.logo}
                                    ${home.name}
                                </strong>
                            </div>

                            <div class="vs">
                                ${score}
                            </div>

                            <div>
                                <strong>
                                    ${away.logo}
                                    ${away.name}
                                </strong>
                            </div>

                        </div>

                        <div class="match-date">
                            ${formatDate(game.date)}
                            · ${game.status}
                        </div>

                    </div>

                `;

            }
        ).join("");

}


/* =========================================
   일정
   ========================================= */

function renderSchedule() {

    const element =
        document.getElementById("schedule-list");

    if (!element) return;


    element.innerHTML =
        data.games.map(
            game => {

                const home =
                    getTeam(game.home);

                const away =
                    getTeam(game.away);


                return `

                    <div class="next-match">

                        <div class="date">
                            ${formatDate(game.date)}
                        </div>

                        <div class="team">
                            ${home.logo}
                            <strong>
                                ${home.name}
                            </strong>
                        </div>

                        <div class="big-vs">
                            VS
                        </div>

                        <div class="team">
                            ${away.logo}
                            <strong>
                                ${away.name}
                            </strong>
                        </div>

                        <div class="game-number">
                            ${game.id}차전
                        </div>

                    </div>

                `;

            }
        ).join("");

}


/* =========================================
   전체 순위
   ========================================= */

function renderStandings() {

    const element =
        document.getElementById("standings-list");

    if (!element) return;


    const standings =
        calculateStandings();


    element.innerHTML = `

        <div class="box">

            ${standings.map(
                (item, index) => `

                <div class="ranking">

                    <div>

                        <b>
                            ${index + 1}
                        </b>

                        <span>
                            ${item.team.logo}
                            ${item.team.name}
                        </span>

                        <strong>
                            ${item.wins}승
                            ${item.losses}패
                            ${item.draws}무
                            · ${item.points}점
                        </strong>

                    </div>

                </div>

            `
            ).join("")}

        </div>

    `;

}


/* =========================================
   팀
   ========================================= */

function renderTeams() {

    const element =
        document.getElementById("teams-list");

    if (!element) return;


    element.innerHTML =
        data.teams.map(
            team => `

            <div
                class="team-card"
                style="background:${team.color}"
            >

                <div class="team-logo">
                    ${team.logo}
                </div>

                <strong>
                    ${team.name}
                </strong>

                <small>
                    ${team.english}
                </small>

            </div>

            `
        ).join("");

}


/* =========================================
   선수
   ========================================= */

function renderPlayers() {

    const element =
        document.getElementById("players-list");

    if (!element) return;


    element.innerHTML =
        data.players.map(
            player => {

                const team =
                    getTeam(player.team);


                return `

                    <div class="box">

                        <div class="box-title">

                            ${team.logo}
                            ${player.name}

                        </div>

                        <div style="padding:20px">

                            <strong>
                                ${team.name}
                            </strong>

                            <p>
                                등번호 ${player.number}
                            </p>

                            <p>
                                ${player.position}
                            </p>

                        </div>

                    </div>

                `;

            }
        ).join("");

}


/* =========================================
   기록
   ========================================= */

function renderRecords() {

    const element =
        document.getElementById("records-list");

    if (!element) return;


    const standings =
        calculateStandings();


    element.innerHTML =
        standings.map(
            item => `

            <div class="box">

                <div class="box-title">

                    ${item.team.logo}
                    ${item.team.name}

                </div>

                <div style="padding:20px">

                    승리
                    <strong>
                        ${item.wins}
                    </strong>

                    <br><br>

                    패배
                    <strong>
                        ${item.losses}
                    </strong>

                    <br><br>

                    무승부
                    <strong>
                        ${item.draws}
                    </strong>

                    <br><br>

                    승점
                    <strong>
                        ${item.points}
                    </strong>

                </div>

            </div>

            `
        ).join("");

}


/* =========================================
   뉴스
   ========================================= */

function renderNews() {

    const element =
        document.getElementById("news-list");

    if (!element) return;


    element.innerHTML =
        data.news
            .slice()
            .reverse()
            .map(
                news => `

                <article>

                    <span>
                        ${news.category}
                    </span>

                    <strong>
                        ${news.title}
                    </strong>

                    <time>
                        ${news.date}
                    </time>

                </article>

                `
            )
            .join("");

}


/* =========================================
   모든 화면 실행
   ========================================= */

function renderCPL() {

    renderNextGame();

    renderHomeStandings();

    renderGames();

    renderSchedule();

    renderStandings();

    renderTeams();

    renderPlayers();

    renderRecords();

    renderNews();

}


/* =========================================
   사이트 시작
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    renderCPL
);