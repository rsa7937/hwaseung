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

  // 모바일 메뉴 열기
  $btnMmenu.on('click', function () {
    $mSubmenu.addClass('active');
    $dim.fadeIn(duration);
  });
  // 모바일 메뉴 닫기
  $btnClose.add($dim).on('click', function () {
    $mSubmenu.removeClass('active');
    $dim.fadeOut(duration);
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

  // 스크롤 이벤트
  $window.on('scroll', function () {
    // 얼마나 스크롤 되었는지 값을 구해서 저장
    const scrollTop = $(this).scrollTop();
    // 비주얼 영역의 세로크기 저장
    const visualHeight = $('.visual').outerHeight();
    console.log(scrollTop, visualHeight);

    // 두 값을 비교해서 (스크롤깂이 비주얼 영역의 세로보다 크다면 = 비주얼 영역을 지난다.)
    if (scrollTop >= visualHeight) {
      // w-bg클래스를 더해줌
      $header.addClass('w-bg');
    } else {
      // 작으면 w-bg클래스를 제거함
      $header.removeClass('w-bg');
    }
  });

  // family site
  $('.family-site select').on('change', function () {
    const linkValue = $(this).val();

    window.open(linkValue);
  });
});
