/* =========================================
   CPL 관리자 로그인
   테스트용
========================================= */


/*
    ⚠️ 테스트용 비밀번호

    공개하기 전에는 실제 인증 시스템으로
    교체해야 합니다.
*/

const ADMIN_PASSWORD = "1234";


/* =========================================
   로그인
========================================= */

function loginAdmin() {

    const password =
        document.getElementById(
            "admin-password"
        ).value;

    const error =
        document.getElementById(
            "login-error"
        );


    if (password === ADMIN_PASSWORD) {

        sessionStorage.setItem(
            "CPL_ADMIN_LOGIN",
            "true"
        );

        showAdmin();

    } else {

        error.style.display = "block";

    }

}


/* =========================================
   관리자 화면 표시
========================================= */

function showAdmin() {

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
        "CPL_ADMIN_LOGIN"
    );

    location.reload();

}


/* =========================================
   관리자 메뉴
========================================= */

function openSection(section) {

    alert(
        section +
        " 관리 기능을 연결하는 단계입니다."
    );

}


/* =========================================
   페이지 시작
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loggedIn =
            sessionStorage.getItem(
                "CPL_ADMIN_LOGIN"
            );


        if (loggedIn === "true") {

            showAdmin();

        }

    }
);
