var myFullpage = new fullpage('#fullpage', {
    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage'],
    navigationTooltips: ['Main', 'Invitation', 'Calendar', 'Gallery', 'Map', 'Account'],
    navigation: true,
    slidesNavigation: true,
    controlArrows: false,
    responsiveWidth: 768, // 모바일에서 반응형 지원
    licenseKey: 'xxxxxxxxxxxxxxxxxxxxxxxxx', // 라이센스 키
    onLeave: function(origin, destination, direction){
        // 남은 날짜 계산하기
        if(destination.index == 2) {
            var weddingDate = new Date("2024-11-30");
            var today = new Date();
            var timeDiff = Math.abs(weddingDate.getTime() - today.getTime());
            var daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
            document.getElementById('days-left').textContent = daysLeft;
        }
    }
});
function generateCalendar(year, month) {
    const calendarTable = document.getElementById('calendar');
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const lastDate = new Date(year, month + 1, 0).getDate(); // 해당 월의 마지막 날
    const firstDay = new Date(year, month, 1).getDay(); // 해당 월의 첫 번째 날 요일

    let tableHTML = '<thead><tr>';
    daysOfWeek.forEach(day => {
        tableHTML += `<th>${day}</th>`;
    });
    tableHTML += '</tr></thead><tbody><tr>';

    // 첫째 주 공백 채우기
    for (let i = 0; i < firstDay; i++) {
        tableHTML += '<td></td>';
    }

    // 날짜 채우기
    for (let day = 1; day <= lastDate; day++) {
        if ((day + firstDay - 1) % 7 === 0) {
            tableHTML += '</tr><tr>'; // 새로운 주 시작
        }
        if (day === 30) {
            tableHTML += `<td><span class="highlight-day">${day}</span></td>`;
        } else {
            tableHTML += `<td>${day}</td>`;
        }
    }

    tableHTML += '</tr></tbody>';
    calendarTable.innerHTML = tableHTML;
}

// 2024년 11월 달력 생성
generateCalendar(2024, 10); // 11월은 10번째 인덱스

let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.gallery-slide');
    slides[currentSlide].classList.remove('active'); // 현재 슬라이드 숨기기

    currentSlide += direction; // 슬라이드 인덱스 변경

    if (currentSlide < 0) {
        currentSlide = slides.length - 1; // 첫 번째 슬라이드로 돌아가기
    } else if (currentSlide >= slides.length) {
        currentSlide = 0; // 마지막 슬라이드에서 첫 번째로
    }

    slides[currentSlide].classList.add('active'); // 새로운 슬라이드 보이기
}

// 터치 및 클릭 이벤트 감지
let startX;

const galleryContainer = document.querySelector('.gallery-container');

galleryContainer.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX; // 터치 시작 위치
});

galleryContainer.addEventListener('touchmove', (event) => {
    const endX = event.touches[0].clientX; // 터치 이동 위치
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) { // 스와이프 거리 감지
        if (diffX > 0) {
            changeSlide(1); // 왼쪽 스와이프 시 다음 슬라이드
        } else {
            changeSlide(-1); // 오른쪽 스와이프 시 이전 슬라이드
        }
        startX = null; // 터치 초기화
    }
});

// 클릭 이벤트 감지 (오른쪽 클릭 및 일반 클릭)
galleryContainer.addEventListener('click', () => {
    changeSlide(1); // 클릭 시 다음 슬라이드로 이동
});

// 첫 번째 슬라이드를 보이도록 초기화
document.addEventListener('DOMContentLoaded', () => {
    changeSlide(0);
});
