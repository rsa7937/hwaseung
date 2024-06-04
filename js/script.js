$(function () {
  // GNB
  const $window = $(window);
  const $header = $('#header');
  const $menu = $('.gnb > li');
  const $submenu = $('.submenu-wrap');
  const $banner = $('.banner-slide');
  const $btnMenu = $('.btn-menu');

  const duration = 200;

  // Mobile GNB
  const $btnMmenu = $('.btn-m-menu');
  const $mSubmenu = $('.m-submenu-wrap');
  const $dim = $('.dim');
  const $btnClose = $('.btn-close');
  const $mGnbMenu = $('.m-gnb > li');
  const $mGnbSubmenu = $('.m-gnb-sub');

  $('.m-lang-select > li').on('click', function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });

  // 모바일용 메뉴를 클릭했을 때
  $mGnbMenu.on('click', function () {
    $(this).toggleClass('on');
    $(this).siblings().removeClass('on');
    $(this).find($mGnbSubmenu).stop().slideToggle(duration);
    $(this).siblings().find($mGnbSubmenu).stop().slideUp(duration);
  });

  // 모바일 메뉴 열기
  $btnMmenu.on('click', function () {
    $mSubmenu.addClass('active');
    $dim.fadeIn(duration);
  });
  // 모바일 메뉴 닫기
  $btnClose.add($dim).on('click', function () {
    $mSubmenu.removeClass('active');
    $dim.fadeOut(duration);

    // 모바일 용 서브메뉴 초기화
    $mGnbMenu.removeClass('on');
    $mGnbSubmenu.stop().slideUp();
  });

  // 마우스가 메뉴에 들어오면(mouseenter)
  $menu.on('mouseenter', function () {
    const menuIdx = $(this).index();
    $menu.removeClass('on').eq(menuIdx).addClass('on');
    $submenu.find('li').removeClass('on').eq(menuIdx).addClass('on');

    openMenu();
  });

  // 마우스가 메뉴에 나가면(mouseleave)
  $header.on('mouseleave', function () {
    $menu.removeClass('on');
    $submenu.find('li').removeClass('on');

    closeMenu();
  });

  // 메뉴 버튼을 클릭했을 때
  $btnMenu.on('click', openMenu);

  // 메뉴의 동작을 함수로 정의
  function openMenu() {
    $header.addClass('active');
    $submenu.stop().fadeIn(duration);
    $banner.stop().fadeIn(duration);
  }
  function closeMenu() {
    $header.removeClass('active');
    $submenu.stop().fadeOut(duration);
    $banner.stop().fadeOut(duration);
  }
  // 윈도우의 스크롤값
  let scrollTop = $window.scrollTop();
  // 비주얼 영역의 세로크기 저장
  // console.log(scrollTop, visualHeight);
  setWhiteBackground();

  // 윈도우 창의 크기를 다시 조절했을 때, 비주얼의 세로 크기를 다시 구해서 w-bg를 뿌림
  $window.on('resize', setWhiteBackground);

  function setWhiteBackground() {
    // 비주얼 값도 갱신이 필요함
    // 외부에 있던 변수를 안으로 들여보냄
    const visualHeight = $('.visual').outerHeight();
    if (scrollTop >= visualHeight) {
      $header.addClass('w-bg');
    } else {
      $header.removeClass('w-bg');
    }
  }

  // 스크롤 이벤트
  $window.on('scroll', function () {
    // 얼마나 스크롤 되었는지 값을 구해서 저장
    // 이벤트에 의해서 스크롤값을 다시 가져옴
    scrollTop = $(this).scrollTop();
    setWhiteBackground();
  });

  // 언어 선택
  $('.btn-lang').on('click', function () {
    $('.lang-select').stop().slideToggle(duration);
  });

  // family site
  $('.family-site select').on('change', function () {
    const linkValue = $(this).val();

    window.open(linkValue);
  });

  // AOS.js
  AOS.init({
    duration: 600,
    offset: 100,
  });

  // 지속가능경영 슬라이더
  const managementList = new Swiper('.management-list', {
    autoplay: {
      delay: 3000,
    },
    slidesPerView: 1,
    centeredSlides: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev',
    },
    breakpoints: {
      1024: {
        slidesPerView: 4, // 가로크기 675px을 위해 (2700 / 4)
      },
    },
  });

  $('.btn-control-wrap .btn-play').on('click', function () {
    managementList.autoplay.start();
    $(this).hide();
    $('.btn-control-wrap .btn-paused').show();
  });
  $('.btn-control-wrap .btn-paused').on('click', function () {
    managementList.autoplay.stop();
    $(this).hide();
    $('.btn-control-wrap .btn-play').show();
  });
});
