/* =========================================
   CPL ADMIN SYSTEM
   2026
========================================= */


/* =========================================
   기본 설정
========================================= */

/*
   테스트용 비밀번호

   실제 공개 사이트 보안용으로는 사용하지 마세요.
*/
const ADMIN_PASSWORD = "1234";

const LOGIN_KEY = "CPL_ADMIN_LOGIN";

const DATA_KEY = "CPL_DATA";


/* =========================================
   데이터 불러오기
========================================= */

function getData() {

    const saved =
        localStorage.getItem(DATA_KEY);

    if (saved) {

        try {

            return JSON.parse(saved);

        } catch (error) {

            console.error(
                "저장된 CPL 데이터를 읽을 수 없습니다.",
                error
            );

        }
    }


    return JSON.parse(
        JSON.stringify(window.CPL_DATA)
    );
}


/* 현재 관리자 데이터 */

let data = getData();


/* =========================================
   데이터 저장
========================================= */

function saveData() {

    localStorage.setItem(
        DATA_KEY,
        JSON.stringify(data)
    );

    /*
       다른 화면에서 사용할 수 있도록
       현재 메모리 데이터도 갱신
    */

    window.CPL_DATA = data;

}


/* =========================================
   팀 찾기
========================================= */

function getTeam(teamId) {

    return data.teams.find(
        team => team.id === teamId
    );

}


/* =========================================
   로그인
========================================= */

function loginAdmin() {

    const input =
        document.getElementById(
            "admin-password"
        );

    const error =
        document.getElementById(
            "login-error"
        );


    if (
        input.value === ADMIN_PASSWORD
    ) {

        sessionStorage.setItem(
            LOGIN_KEY,
            "true"
        );

        error.style.display = "none";

        showAdminPanel();

    } else {

        error.style.display = "block";

        input.value = "";

        input.focus();

    }

}


/* =========================================
   관리자 화면 표시
========================================= */

function showAdminPanel() {

    document.getElementById(
        "login-screen"
    ).style.display = "none";


    document.getElementById(
        "admin-panel"
    ).style.display = "block";

}


/* =========================================
   로그아웃
========================================= */

function logoutAdmin() {

    sessionStorage.removeItem(
        LOGIN_KEY
    );

    location.reload();

}


/* =========================================
   관리 메뉴 열기
========================================= */

function openManager(type) {

    closeManagers();


    const manager =
        document.getElementById(
            "manager-" + type
        );


    if (!manager) return;


    manager.classList.add("active");


    if (type === "games") {

        renderGames();

    }


    if (type === "schedule") {

        renderSchedule();

    }


    if (type === "news") {

        renderNews();

    }


    if (type === "teams") {

        renderTeams();

    }


    if (type === "players") {

        renderPlayers();

    }


    if (type === "standings") {

        renderStandings();

    }


    window.scrollTo({
        top: manager.offsetTop - 20,
        behavior: "smooth"
    });

}


/* =========================================
   모든 관리 화면 닫기
========================================= */

function closeManagers() {

    document
        .querySelectorAll(".manager")
        .forEach(
            manager =>
                manager.classList.remove(
                    "active"
                )
        );

}


/* =========================================
   3. 경기 결과
========================================= */

function renderGames() {

    const container =
        document.getElementById(
            "games-content"
        );


    let html = `
        <div class="table-wrap">
        <table>

        <thead>
        <tr>
            <th>경기</th>
            <th>날짜</th>
            <th>홈팀</th>
            <th>홈 점수</th>
            <th>원정팀</th>
            <th>원정 점수</th>
            <th>상태</th>
        </tr>
        </thead>

        <tbody>
    `;


    data.games.forEach(
        function(game) {

            const home =
                getTeam(game.home);

            const away =
                getTeam(game.away);


            html += `
                <tr>

                    <td>
                        ${game.id}차전
                    </td>

                    <td>
                        ${game.date}
                    </td>

                    <td>
                        ${home ? home.name : game.home}
                    </td>

                    <td>
                        <input
                            class="small-input"
                            type="number"
                            min="0"
                            value="${
                                game.homeScore ?? ""
                            }"
                            onchange="
                                updateGameScore(
                                    ${game.id},
                                    'homeScore',
                                    this.value
                                )
                            "
                        >
                    </td>

                    <td>
                        ${away ? away.name : game.away}
                    </td>

                    <td>
                        <input
                            class="small-input"
                            type="number"
                            min="0"
                            value="${
                                game.awayScore ?? ""
                            }"
                            onchange="
                                updateGameScore(
                                    ${game.id},
                                    'awayScore',
                                    this.value
                                )
                            "
                        >
                    </td>

                    <td>
                        <span class="status">
                            ${game.status}
                        </span>
                    </td>

                </tr>
            `;

        }
    );


    html += `
        </tbody>
        </table>
        </div>

        <br>

        <button
            class="save-btn"
            onclick="saveAndRefresh('경기 결과')"
        >
            💾 경기 결과 저장
        </button>
    `;


    container.innerHTML = html;

}


/* 경기 점수 수정 */

function updateGameScore(
    gameId,
    field,
    value
) {

    const game =
        data.games.find(
            game => game.id === gameId
        );


    if (!game) return;


    if (value === "") {

        game[field] = null;

    } else {

        game[field] =
            Number(value);

    }


    if (
        game.homeScore !== null &&
        game.awayScore !== null
    ) {

        game.status = "종료";

    } else {

        game.status = "예정";

    }

}


/* =========================================
   4. 일정
========================================= */

function renderSchedule() {

    const container =
        document.getElementById(
            "schedule-content"
        );


    let html = `
        <div class="table-wrap">

        <table>

        <thead>
        <tr>
            <th>경기</th>
            <th>날짜</th>
            <th>홈팀</th>
            <th>원정팀</th>
        </tr>
        </thead>

        <tbody>
    `;


    data.games.forEach(
        function(game) {

            html += `
                <tr>

                    <td>
                        ${game.id}차전
                    </td>

                    <td>

                        <input
                            class="small-input"
                            type="date"
                            value="${game.date}"
                            onchange="
                                updateGameDate(
                                    ${game.id},
                                    this.value
                                )
                            "
                        >

                    </td>

                    <td>

                        <select
                            class="small-input"
                            onchange="
                                updateGameTeam(
                                    ${game.id},
                                    'home',
                                    this.value
                                )
                            "
                        >

                            ${teamOptions(
                                game.home
                            )}

                        </select>

                    </td>

                    <td>

                        <select
                            class="small-input"
                            onchange="
                                updateGameTeam(
                                    ${game.id},
                                    'away',
                                    this.value
                                )
                            "
                        >

                            ${teamOptions(
                                game.away
                            )}

                        </select>

                    </td>

                </tr>
            `;

        }
    );


    html += `
        </tbody>
        </table>
        </div>

        <br>

        <button
            class="save-btn"
            onclick="saveAndRefresh('일정')"
        >
            💾 일정 저장
        </button>
    `;


    container.innerHTML = html;

}


/* 팀 선택 옵션 */

function teamOptions(selected) {

    return data.teams
        .map(
            team => `
                <option
                    value="${team.id}"
                    ${
                        team.id === selected
                            ? "selected"
                            : ""
                    }
                >
                    ${team.name}
                </option>
            `
        )
        .join("");

}


/* 날짜 수정 */

function updateGameDate(
    gameId,
    value
) {

    const game =
        data.games.find(
            game => game.id === gameId
        );


    if (game) {

        game.date = value;

    }

}


/* 홈/원정팀 수정 */

function updateGameTeam(
    gameId,
    side,
    value
) {

    const game =
        data.games.find(
            game => game.id === gameId
        );


    if (!game) return;


    game[side] = value;

}


/* =========================================
   5. 뉴스
========================================= */

function renderNews() {

    const container =
        document.getElementById(
            "news-content"
        );


    let html = "";


    data.news.forEach(
        function(news, index) {

            html += `
                <div
                    class="admin-card"
                    style="margin-top:18px;"
                >

                    <div class="form-grid">

                        <div class="field">

                            <label>
                                카테고리
                            </label>

                            <input
                                class="input"
                                value="${escapeHTML(
                                    news.category
                                )}"
                                onchange="
                                    updateNews(
                                        ${index},
                                        'category',
                                        this.value
                                    )
                                "
                            >

                        </div>


                        <div class="field">

                            <label>
                                날짜
                            </label>

                            <input
                                class="input"
                                type="date"
                                value="${news.date}"
                                onchange="
                                    updateNews(
                                        ${index},
                                        'date',
                                        this.value
                                    )
                                "
                            >

                        </div>

                    </div>


                    <div class="field">

                        <label>
                            제목
                        </label>

                        <input
                            class="input"
                            value="${escapeHTML(
                                news.title
                            )}"
                            onchange="
                                updateNews(
                                    ${index},
                                    'title',
                                    this.value
                                )
                            "
                        >

                    </div>


                    <div class="field">

                        <label>
                            내용
                        </label>

                        <textarea
                            class="input"
                            onchange="
                                updateNews(
                                    ${index},
                                    'content',
                                    this.value
                                )
                            "
                        >${escapeHTML(
                            news.content
                        )}</textarea>

                    </div>


                    <button
                        class="danger-btn"
                        onclick="
                            deleteNews(${index})
                        "
                    >
                        🗑️ 삭제
                    </button>

                </div>
            `;

        }
    );


    container.innerHTML = html;

}


/* 뉴스 수정 */

function updateNews(
    index,
    field,
    value
) {

    if (!data.news[index]) return;

    data.news[index][field] = value;

}


/* 뉴스 추가 */

function addNews() {

    const newId =
        Date.now();


    data.news.unshift({

        id: newId,

        category: "공지",

        title: "새 CPL 뉴스",

        content: "뉴스 내용을 입력하세요.",

        date: new Date()
            .toISOString()
            .slice(0, 10)

    });


    renderNews();

}


/* 뉴스 삭제 */

function deleteNews(index) {

    if (
        !confirm(
            "이 뉴스를 삭제할까요?"
        )
    ) {

        return;

    }


    data.news.splice(
        index,
        1
    );


    renderNews();

}


/* =========================================
   6. 팀
========================================= */

function renderTeams() {

    const container =
        document.getElementById(
            "teams-content"
        );


    let html = `
        <div class="table-wrap">

        <table>

        <thead>
        <tr>
            <th>ID</th>
            <th>팀명</th>
            <th>영문명</th>
            <th>로고</th>
            <th>색상</th>
        </tr>
        </thead>

        <tbody>
    `;


    data.teams.forEach(
        function(team, index) {

            html += `
                <tr>

                    <td>
                        ${team.id}
                    </td>

                    <td>

                        <input
                            class="small-input"
                            value="${escapeHTML(
                                team.name
                            )}"
                            onchange="
                                updateTeam(
                                    ${index},
                                    'name',
                                    this.value
                                )
                            "
                        >

                    </td>

                    <td>

                        <input
                            class="small-input"
                            value="${escapeHTML(
                                team.english
                            )}"
                            onchange="
                                updateTeam(
                                    ${index},
                                    'english',
                                    this.value
                                )
                            "
                        >

                    </td>

                    <td>

                        <input
                            class="small-input"
                            value="${escapeHTML(
                                team.logo
                            )}"
                            onchange="
                                updateTeam(
                                    ${index},
                                    'logo',
                                    this.value
                                )
                            "
                        >

                    </td>

                    <td>

                        <input
                            class="small-input"
                            type="color"
                            value="${team.color}"
                            onchange="
                                updateTeam(
                                    ${index},
                                    'color',
                                    this.value
                                )
                            "
                        >

                    </td>

                </tr>
            `;

        }
    );


    html += `
        </tbody>
        </table>
        </div>

        <br>

        <button
            class="save-btn"
            onclick="saveAndRefresh('팀 정보')"
        >
            💾 팀 정보 저장
        </button>
    `;


    container.innerHTML = html;

}


/* 팀 수정 */

function updateTeam(
    index,
    field,
    value
) {

    if (!data.teams[index]) return;

    data.teams[index][field] = value;

}


/* =========================================
   7. 선수
========================================= */

function renderPlayers() {

    const container =
        document.getElementById(
            "players-content"
        );


    let html = `
        <div class="table-wrap">

        <table>

        <thead>
        <tr>
            <th>ID</th>
            <th>이름</th>
            <th>팀</th>
            <th>번호</th>
            <th>포지션</th>
        </tr>
        </thead>

        <tbody>
    `;


    data.players.forEach(
        function(player, index) {

            html += `
                <tr>

                    <td>
                        ${player.id}
                    </td>

                    <td>

                        <input
                            class="small-input"
                            value="${escapeHTML(
                                player.name
                            )}"
                            onchange="
                                updatePlayer(
                                    ${index},
                                    'name',
                                    this.value
                                )
                            "
                        >

                    </td>

                    <td>

                        <select
                            class="small-input"
                            onchange="
                                updatePlayer(
                                    ${index},
                                    'team',
                                    this.value
                                )
                            "
                        >

                            ${teamOptions(
                                player.team
                            )}

                        </select>

                    </td>

                    <td>

                        <input
                            class="small-input"
                            type="number"
                            min="0"
                            value="${player.number}"
                            onchange="
                                updatePlayer(
                                    ${index},
                                    'number',
                                    this.value
                                )
                            "
                        >

                    </td>

                    <td>

                        <input
                            class="small-input"
                            value="${escapeHTML(
                                player.position
                            )}"
                            onchange="
                                updatePlayer(
                                    ${index},
                                    'position',
                                    this.value
                                )
                            "
                        >

                    </td>

                </tr>
            `;

        }
    );


    html += `
        </tbody>
        </table>
        </div>

        <br>

        <button
            class="save-btn"
            onclick="saveAndRefresh('선수 정보')"
        >
            💾 선수 정보 저장
        </button>
    `;


    container.innerHTML = html;

}


/* 선수 수정 */

function updatePlayer(
    index,
    field,
    value
) {

    if (!data.players[index]) return;


    if (field === "number") {

        data.players[index][field] =
            Number(value);

    } else {

        data.players[index][field] =
            value;

    }

}


/* =========================================
   8. 순위 자동 계산
========================================= */

function calculateStandings() {

    const standings =
        data.teams.map(
            function(team) {

                return {

                    id: team.id,

                    name: team.name,

                    logo: team.logo,

                    played: 0,

                    wins: 0,

                    draws: 0,

                    losses: 0,

                    points: 0,

                    runsFor: 0,

                    runsAgainst: 0

                };

            }
        );


    data.games.forEach(
        function(game) {

            /*
               아직 끝나지 않은 경기는 제외
            */

            if (
                game.homeScore === null ||
                game.awayScore === null
            ) {

                return;

            }


            const home =
                standings.find(
                    team =>
                        team.id === game.home
                );


            const away =
                standings.find(
                    team =>
                        team.id === game.away
                );


            if (!home || !away) return;


            const hs =
                Number(game.homeScore);


            const as =
                Number(game.awayScore);


            home.played++;
            away.played++;


            home.runsFor += hs;
            home.runsAgainst += as;

            away.runsFor += as;
            away.runsAgainst += hs;


            if (hs > as) {

                home.wins++;
                home.points += 3;

                away.losses++;

            }

            else if (hs < as) {

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

        }
    );


    standings.forEach(
        function(team) {

            team.diff =
                team.runsFor -
                team.runsAgainst;

        }
    );


    standings.sort(
        function(a, b) {

            if (
                b.points !== a.points
            ) {

                return b.points -
                    a.points;

            }


            if (
                b.wins !== a.wins
            ) {

                return b.wins -
                    a.wins;

            }


            return b.diff -
                a.diff;

        }
    );


    return standings;

}


/* 순위 표시 */

function renderStandings() {

    const container =
        document.getElementById(
            "standings-content"
        );


    const standings =
        calculateStandings();


    let html = `
        <div class="table-wrap">

        <table>

        <thead>

        <tr>
            <th>순위</th>
            <th>팀</th>
            <th>경기</th>
            <th>승</th>
            <th>무</th>
            <th>패</th>
            <th>득점</th>
            <th>실점</th>
            <th>득실</th>
            <th>승점</th>
        </tr>

        </thead>

        <tbody>
    `;


    standings.forEach(
        function(team, index) {

            html += `
                <tr>

                    <td>
                        <strong>
                            ${index + 1}
                        </strong>
                    </td>

                    <td>
                        ${team.logo}
                        ${team.name}
                    </td>

                    <td>
                        ${team.played}
                    </td>

                    <td>
                        ${team.wins}
                    </td>

                    <td>
                        ${team.draws}
                    </td>

                    <td>
                        ${team.losses}
                    </td>

                    <td>
                        ${team.runsFor}
                    </td>

                    <td>
                        ${team.runsAgainst}
                    </td>

                    <td>
                        ${team.diff}
                    </td>

                    <td>
                        <strong>
                            ${team.points}
                        </strong>
                    </td>

                </tr>
            `;

        }
    );


    html += `
        </tbody>

        </table>

        </div>

        <br>

        <p>
            ※ 승리 3점 · 무승부 1점 · 패배 0점
        </p>
    `;


    container.innerHTML = html;

}


/* =========================================
   저장 후 안내
========================================= */

function saveAndRefresh(name) {

    saveData();


    alert(
        "💾 " +
        name +
        " 저장 완료!"
    );


    if (name === "경기 결과") {

        renderGames();

    }


    if (name === "일정") {

        renderSchedule();

    }


    if (name === "팀 정보") {

        renderTeams();

    }


    if (name === "선수 정보") {

        renderPlayers();

    }


    if (name === "경기 결과") {

        renderStandings();

    }

}


/* =========================================
   HTML 안전 처리
========================================= */

function escapeHTML(value) {

    if (value === null ||
        value === undefined) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================
   페이지 시작
========================================= */

function startAdmin() {

    const loginButton =
        document.getElementById(
            "login-button"
        );


    const logoutButton =
        document.getElementById(
            "logout-button"
        );


    const passwordInput =
        document.getElementById(
            "admin-password"
        );


    loginButton.addEventListener(
        "click",
        loginAdmin
    );


    logoutButton.addEventListener(
        "click",
        logoutAdmin
    );


    passwordInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                loginAdmin();

            }

        }
    );


    const loggedIn =
        sessionStorage.getItem(
            LOGIN_KEY
        );


    if (
        loggedIn === "true"
    ) {

        showAdminPanel();

    }

}


/* =========================================
   실행
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    startAdmin
);
