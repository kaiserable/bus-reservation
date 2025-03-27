// ✅ 사이드바 토글
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.left = (sidebar.style.left === '0px') ? '-250px' : '0px';
}

// ✅ QR 토글
function toggleQR() {
    const qr = document.getElementById('qr-image');
    qr.style.display = qr.style.display === 'none' ? 'block' : 'none';
}

// ✅ QR 모달 열기/닫기
function openQRModal() {
    document.getElementById('qrModal').style.display = 'block';
}
function closeQRModal() {
    document.getElementById('qrModal').style.display = 'none';
}

// ✅ 홈화면으로 이동
function loadHomePage() {
    location.reload();
}

// ✅ 공통 HTML 페이지 로딩 함수
function loadPage(url, containerSelector, cssPath, jsPath = null) {
    fetch(url)
        .then(res => res.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.querySelector(containerSelector);
            const main = document.querySelector('main');
            main.innerHTML = '';
            main.appendChild(content);
            window.scrollTo(0, 0);

            if (cssPath && !document.querySelector(`link[href="${cssPath}"]`)) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = cssPath;
                document.head.appendChild(link);
            }

            if (jsPath && !document.querySelector(`script[src="${jsPath}"]`)) {
                const script = document.createElement("script");
                script.src = jsPath;
                script.defer = true;
                document.body.appendChild(script);
            }
        })
        .catch(err => console.error(`${url} 로드 중 오류 발생:`, err));
}

// ✅ 각 기능별 페이지 로딩
function loadMemberPage() {
    loadPage("/Member_information/Member_information.html", ".container", "/Member_information/Member_information.css");
}
function loadMessageboxPage() {
    loadPage("/Messagebox/Messagebox.html", ".messagebox-container", "/Messagebox/Messagebox.css");
}
function loadBoardingPage() {
    loadPage("/Boarding_Detail/Boarding_Detail.html", ".container", "/Boarding_Detail/Boarding_Detail.css");
}
function loadBusReservationPage() {
    loadPage("/bus-reservation/bus-reservation.html", ".content-wrapper", "/bus-reservation/bus-reservation.css", "/bus-reservation/bus-reservation.js");
}
function loadBusLogPage() {
    loadPage("/Bus_log/Bus_log.html", ".container", "/Bus_log/Bus_log.css");
}
function loadNoticePage() {
    loadPage("/Notice_board/Notice_board.html", ".container", "/Notice_board/Notice_board.css");
}
function loadStationPage() {
    loadPage("/station/station.html", ".container", "/station/station.css", "/station/station.js");
}

// ✅ 버스예약 내역 탭 전환 함수
function showTab(tabName) {
    document.getElementById('log-section').style.display = (tabName === 'log') ? 'block' : 'none';
    document.getElementById('history-section').style.display = (tabName === 'history') ? 'block' : 'none';

    const buttons = document.querySelectorAll('.tab');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (tabName === 'log') buttons[0].classList.add('active');
    else buttons[1].classList.add('active');
}

// ✅ DOM 로드 후 사이드 메뉴 이벤트 연결
document.addEventListener("DOMContentLoaded", () => {
    const menuMap = {
        "menu-member": loadMemberPage,
        "menu-messagebox": loadMessageboxPage,
        "menu-boarding": loadBoardingPage,
        "menu-bus-reservation": loadBusReservationPage,
        "menu-bus-log": loadBusLogPage,
        "menu-notice": loadNoticePage,
        "menu-station": loadStationPage
    };

    for (const [id, handler] of Object.entries(menuMap)) {
        const el = document.getElementById(id);
        if (el) el.addEventListener("click", handler);
    }

    const title = document.querySelector(".center-title");
    if (title) title.addEventListener("click", loadHomePage);

    // ✅ 로그아웃 기능
    const logoutMenu = document.getElementById("menu-logout");
    if (logoutMenu) {
        logoutMenu.addEventListener("click", () => {
            // 세션 초기화 처리 등 필요 시 여기에 추가
            window.location.href = "/login.html";
        });
    }
});
