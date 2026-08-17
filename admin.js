/* =========================================
   CPL 관리자 시스템
   ========================================= */


/* =========================================
   테스트용 관리자 비밀번호
   ========================================= */

const ADMIN_PASSWORD = "1234";


/* =========================================
   로그인 상태
   ========================================= */

const LOGIN_KEY = "CPL_ADMIN_LOGIN";


/* =========================================
   관리자 로그인
   ========================================= */

function loginAdmin() {

    const passwordInput =
        document.getElementById("admin-password");

    const error =
        document.getElementById("login-error");


    const password =
        passwordInput.value;


    if (password === ADMIN_PASSWORD) {

        sessionStorage.setItem(
            LOGIN_KEY,
            "true"
        );


        error.style.display = "none";


        showAdminPanel();

    } else {

        error.style.display = "block";

        passwordInput.value = "";

        passwordInput.focus();

    }

}


/* =========================================
   관리자 화면 표시
   ========================================= */

function showAdminPanel() {

    const loginScreen =
        document.getElementById("login-screen");

    const adminPanel =
        document.getElementById("admin-panel");


    loginScreen.style.display = "none";

    adminPanel.style.display = "block";

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
   메뉴 테스트
   ========================================= */

function openAdminMenu(menuName) {

    alert(
        "현재 선택: " +
        menuName +
        "\n\n" +
        "다음 단계에서 실제 관리 기능을 연결합니다."
    );

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


    /* 로그인 버튼 */

    loginButton.addEventListener(
        "click",
        loginAdmin
    );


    /* 로그아웃 버튼 */

    logoutButton.addEventListener(
        "click",
        logoutAdmin
    );


    /* Enter 키 */

    passwordInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                loginAdmin();

            }

        }
    );


    /* 기존 로그인 확인 */

    const loggedIn =
        sessionStorage.getItem(
            LOGIN_KEY
        );


    if (loggedIn === "true") {

        showAdminPanel();

    }

}


/* =========================================
   실행
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    startAdmin
);/* =========================================
   경기 결과 관리
========================================= */

function showGameManager() {

    const manager =
        document.getElementById("game-manager");

    manager.style.display = "block";

    loadGameList();

}


/* 경기 목록 */

function loadGameList() {

    const select =
        document.getElementById("gameSelect");

    select.innerHTML = "";

    CPL_DATA.games.forEach(game => {

        const home =
            CPL_DATA.teams.find(
                team => team.id === game.home
            );

        const away =
            CPL_DATA.teams.find(
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


/* 결과 저장 */

function saveGameResult() {

    const gameId =
        Number(
            document.getElementById(
                "gameSelect"
            ).value
        );

    const homeScore =
        Number(
            document.getElementById(
                "homeScore"
            ).value
        );

    const awayScore =
        Number(
            document.getElementById(
                "awayScore"
            ).value
        );


    if (
        document.getElementById("homeScore").value === "" ||
        document.getElementById("awayScore").value === ""
    ) {

        alert("⚾ 두 팀의 점수를 입력해주세요.");

        return;

    }


    const game =
        CPL_DATA.games.find(
            game => game.id === gameId
        );


    if (!game) {

        alert("경기를 찾을 수 없습니다.");

        return;

    }


    game.homeScore = homeScore;

    game.awayScore = awayScore;

    game.status = "종료";


    /* 저장 */

    localStorage.setItem(
        "CPL_DATA",
        JSON.stringify(CPL_DATA)
    );


    alert(
        `⚾ ${gameId}차전 결과 저장 완료!\n\n` +
        `${homeScore} : ${awayScore}`
    );

}
