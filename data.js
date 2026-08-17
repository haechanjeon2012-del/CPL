/* =========================================
   CPL 2026 DATA
   천중 프리미어리그
   ========================================= */

const CPL_DATA = {

    /* =========================
       리그 정보
    ========================= */

    league: {
        name: "천중 프리미어리그",
        english: "Cheonjung Premier League",
        shortName: "CPL",
        season: 2026,
        slogan: "ONE SEASON. ONE CHAMPION."
    },


    /* =========================
       팀
    ========================= */

    teams: [

        {
            id: "haechan",
            name: "해찬",
            english: "HAECHAN",
            logo: "🦁",
            color: "#1769e8"
        },

        {
            id: "sihwan",
            name: "시환",
            english: "SIHWAN",
            logo: "🦅",
            color: "#ed7d22"
        },

        {
            id: "jaewoo",
            name: "재우",
            english: "JAEWOO",
            logo: "🌈",
            color: "#d4b400"
        },

        {
            id: "junyeol",
            name: "준열",
            english: "JUNYEOL",
            logo: "⚫",
            color: "#222222"
        }

    ],


    /* =========================
       선수
    ========================= */

    players: [

        {
            id: "p1",
            name: "해찬",
            team: "haechan",
            number: 1,
            position: "선수"
        },

        {
            id: "p2",
            name: "시환",
            team: "sihwan",
            number: 1,
            position: "선수"
        },

        {
            id: "p3",
            name: "재우",
            team: "jaewoo",
            number: 1,
            position: "선수"
        },

        {
            id: "p4",
            name: "준열",
            team: "junyeol",
            number: 1,
            position: "선수"
        }

    ],


    /* =========================
       정규시즌 12경기
    ========================= */

    games: [

        {
            id: 1,
            date: "2026-08-24",
            home: "junyeol",
            away: "sihwan",
            homeScore: null,
            awayScore: null,
            status: "예정"
        },

        {
            id: 2,
            date: "2026-08-26",
            home: "haechan",
            away: "jaewoo",
            homeScore: null,
            awayScore: null,
            status: "예정"
        },

        {
            id: 3,
            date: "2026-08-28",
            home: "haechan",
            away: "junyeol",
            homeScore: null,
            awayScore: null,
            status: "예정"
        },

        {
            id: 4,
            date: "2026-08-31",
            home: "sihwan",
            away: "jaewoo",
            homeScore: null,
            awayScore: null,
            status: "예정"
        },

        {
            id: 5,
            date: "2026-09-02",
            home: "junyeol",
            away: "jaewoo",
            homeScore: null,
            awayScore: null,
            status: "예정"
        },

        {
            id: 6,
            date: "2026-09-04",
            home: "sihwan",
            away: "haechan",
            homeScore: null,
            awayScore: null,
            status: "예정"
        },

        {
            id: 7,
            date: "2026-09-07",
            home: "sihwan",
            away: "junyeol",
            homeScore: null,
            awayScore: null,
            status: "예정"
        },

        {
            id: 8,
            date: "2026-09-09",
            home: "jaewoo",
            away: "haechan",
            homeScore: null,
            awayScore: null,
            status: "예정"
        },

        {
            id: 9,
            date: "2026-09-11",
            home: "junyeol",
            away: "haechan",
            homeScore: null,
            awayScore: null,
            status: "예정"
        },

        {
            id: 10,
            date: "2026-09-14",
            home: "jaewoo",
            away: "sihwan",
            homeScore: null,
            awayScore: null,
            status: "예정"
        },

        {
            id: 11,
            date: "2026-09-16",
            home: "jaewoo",
            away: "junyeol",
            homeScore: null,
            awayScore: null,
            status: "예정"
        },

        {
            id: 12,
            date: "2026-09-18",
            home: "haechan",
            away: "sihwan",
            homeScore: null,
            awayScore: null,
            status: "예정"
        }

    ],


    /* =========================
       뉴스
    ========================= */

    news: [

        {
            id: 1,
            category: "공지",
            title: "CPL 2026 시즌이 시작됩니다.",
            content: "천중 프리미어리그 2026 시즌 공식 사이트입니다.",
            date: "2026-08-17"
        },

        {
            id: 2,
            category: "리그",
            title: "천중 프리미어리그 공식 사이트 오픈",
            content: "경기, 일정, 순위, 팀, 선수, 기록과 뉴스를 확인하세요.",
            date: "2026-08-17"
        },

        {
            id: 3,
            category: "일정",
            title: "정규시즌 12경기 일정 공개",
            content: "CPL 2026 정규시즌 일정이 공개되었습니다.",
            date: "2026-08-17"
        }

    ]

};


/* =========================================
   다른 파일에서 사용할 수 있도록 연결
   ========================================= */

if (typeof window !== "undefined") {
    window.CPL_DATA = CPL_DATA;
}