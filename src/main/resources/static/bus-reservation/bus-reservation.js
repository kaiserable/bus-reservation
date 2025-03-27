// 등교 / 하교 별 노선 데이터
const routeData = {
    '등교': [
        { value: 'line1', label: '1호선 (3대 배차)' },
        { value: 'line2', label: '2호선 (5대 배차)' },
        { value: 'line3', label: '3호선 (2대 배차)' }
    ],
    '하교': [
        { value: 'lineA', label: 'A코스 (4대 배차)' },
        { value: 'lineB', label: 'B코스 (3대 배차)' },
        { value: 'lineC', label: 'C코스 (2대 배차)' }
    ]
};

// 등교/하교 버튼 처리
function selectMode(mode, buttonElement) {
    document.querySelectorAll('.button-group button').forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');

    const selectElement = document.getElementById('routeSelect');
    selectElement.innerHTML = '<option value="">노선 선택</option>';
    const routes = routeData[mode];
    routes.forEach(route => {
        const option = document.createElement('option');
        option.value = route.value;
        option.textContent = route.label;
        selectElement.appendChild(option);
    });

    document.getElementById('departureList').innerHTML = '';
    document.getElementById('stationList').innerHTML = '';
    document.getElementById('stationSection').style.display = 'none';
    document.getElementById('seatSection').style.display = 'none';
}

// 출발 시간 데이터
const departureData = {
    line1: [
        { busNo: '7998호', date: '03-25(화)', time: '08:30', seats: 44 },
        { busNo: '7998호', date: '03-26(수)', time: '08:30', seats: 44 }
    ],
    line2: [
        { busNo: '8000호', date: '03-25(화)', time: '09:00', seats: 40 },
        { busNo: '8000호', date: '03-26(수)', time: '09:00', seats: 41 }
    ]
};

// 정류장 데이터
const stationData = [
    { name: '구미시청 (버스정류장)', eta: '03-25 08:30' },
    { name: '도량주공 앞 (버스정류장)', eta: '03-25 08:40' },
    { name: '경운대학교 정문', eta: '03-25 08:55' }
];

// 노선 변경 시 출발시간 목록 표시
document.getElementById('routeSelect').addEventListener('change', function () {
    const selectedValue = this.value;
    const listContainer = document.getElementById('departureList');
    listContainer.innerHTML = '';

    if (!departureData[selectedValue]) return;

    departureData[selectedValue].forEach(item => {
        const li = document.createElement('li');
        li.className = 'departure-item';
        li.innerHTML = `
            <span>${item.busNo} <span style="color: red;">(${item.date})</span> ${item.time} / 잔여석:${item.seats}</span>
            <span style="color: #333;">&#8250;</span>
        `;
        li.addEventListener('click', function () {
            document.querySelectorAll('.departure-item').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            renderStationList();
        });
        listContainer.appendChild(li);
    });
});

// 정류장 목록 생성
function renderStationList() {
    const stationList = document.getElementById('stationList');
    stationList.innerHTML = '';
    document.getElementById('stationSection').style.display = 'block';

    stationData.forEach((station) => {
        const li = document.createElement('li');
        li.className = 'station-item';
        li.innerHTML = `
            <span>
                ${station.name}<br>
                <small>도착 예상 시간: ${station.eta}</small>
            </span>
        `;
        li.addEventListener('click', () => {
            document.querySelectorAll('.station-item').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            renderSeats();
        });
        stationList.appendChild(li);
    });
}

// 좌석 선택 생성
function renderSeats() {
    const seatSection = document.getElementById('seatSection');
    seatSection.style.display = 'block';

    const seatLayout = document.querySelector('.seat-layout');
    seatLayout.innerHTML = '';

    let seatNumber = 1;

    for (let i = 0; i < 11; i++) {
        const row = document.createElement('div');
        row.className = 'seat-row';

        for (let j = 0; j < 2; j++) {
            const seat = createSeatButton(seatNumber++);
            row.appendChild(seat);
        }

        const aisle = document.createElement('div');
        aisle.className = 'seat-placeholder';
        row.appendChild(aisle);

        for (let j = 0; j < 2; j++) {
            const seat = createSeatButton(seatNumber++);
            row.appendChild(seat);
        }

        seatLayout.appendChild(row);
    }
}

function createSeatButton(num) {
    const seat = document.createElement('button');
    seat.className = 'seat-btn';
    seat.innerText = `${num}번`;
    handleSeatClick(seat);
    return seat;
}

function handleSeatClick(seat) {
    seat.addEventListener('mousedown', () => {
        seat.classList.add('click_active');
    });
    seat.addEventListener('mouseup', () => {
        seat.classList.remove('click_active');
        document.querySelectorAll('.seat-btn').forEach(btn => btn.classList.remove('selected_active'));
        seat.classList.add('selected_active');
    });
}
