const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function() {
    // console.log(window.scrollY);
    if(window.scrollY > 500) {
        // 배지 숨기기
        // badgeEl.style.display = 'none';
        gsap.to(badgeEl, 0.6, {
            opacity: 0,
            display: 'none'
        });
        // TOP 버튼 보이기!
        gsap.to(toTopEl, .2, {
            x: 0 // x축
        });
    } else {
        // 배지 보이기
        // badgeEl.style.display = 'block';
        gsap.to(badgeEl, 0.6, {
            opacity: 1,
            display: 'block'
        });
        // TOP 버튼 숨기기!
        gsap.to(toTopEl, .2, {
            x: 100
        });
    }
}, 300));
// ._throttle(함수, 시간);
// gsap.to(요소, 지속시간, 옵션);

toTopEl.addEventListener('click', function() {
    gsap.to(window, .7, {
        scrollTo: 0 // 화면의 위치를 0으로 옮겨주겠다. (맨 위로 이동)
    });
});


const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) { // 반복
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * .7,
        opacity: 1
    });
});


// SWIPER
// new => 자바스크립트 생성자(클래스)
// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper', {
    direction: 'vertical',
    autoplay: true, // 자동재생
    loop: true // 반복 재생
});

new Swiper('.promotion .swiper', {
    // direction: 'horizontal', 기본값
    slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    centeredSlides: true, // 1번 슬라이드가 가운데에 보이기
    loop: true,
    autoplay: {
        delay: 5000 // 5s
    },
    pagination: {
        el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
        clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next'
    }
});
new Swiper('.awards .swiper', {
    autoplay: true,
    loop: true,
    spaceBetween: 30,
    // 하나의 화면에 몇개의 슬라이드가 보일 것이냐
    slidesPerView: 5,
    navigation: {
        prevEl: '.awards .swiper-prev',
        nextEl: '.awards .swiper-next'
    }
});


// toggle
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function() {
    isHidePromotion = !isHidePromotion;
    if(isHidePromotion) {
        // true
        // 숨김 처리!
        promotionEl.classList.add('hide');
    } else {
        // false
        // 보임 처리!
        promotionEl.classList.remove('hide');
    }
});


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// animation
function floatingObject(selector, delay, size) {
    // gsap.to(요소, 시간, 옵션);
    gsap.to(
        selector, // 선택자
        random(1.5, 2.5), // 애니메이션 동작 시간
        { // 옵션
            y: size, // y축
            repeat: -1, // 무한 반복
            yoyo: true, // 한번 재생한 애니메이션을 다시 한번 뒤로 돌려서 실행
            ease: Power1.easeInOut,
            delay: random(0, delay) // 몇초뒤에 애니메이션을 실행
        }
    );
}
floatingObject('.floating', 1, 15);
floatingObject('.floating', 0.5, 15);
floatingObject('.floating', 1.5, 20);


// scrollMagic
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
    // .setClassToggle() 어떤 클래스를 넣었다 뺐다 조절
    new ScrollMagic
        .Scene({
            triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 저장
            triggerHook: .8 // 뷰포트가 시작하는 부분 0, 마지막 부분 1
            // triggerHook: 내가 감시하고 있는 요소가 뷰포트에 어떤 지점에서 감시되었다는 것을 판단할 것인가를 지정하는 옵션
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller());
});