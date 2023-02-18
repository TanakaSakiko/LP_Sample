//ドロワー開閉 + 背景固定
var flag = false;
var position;

$('.js-header__icon, .js-drawer__icon,  .js-drawer__overlay, .js-drawer__nav-items > li > a').click(function (e) {
  e.preventDefault();
  if (flag == false) {
    position = $(window).scrollTop();
    $('body').addClass('is-fixed').css({ 'top': - position });
    flag = true;
  } else {
    $('body').removeClass('is-fixed').css({ 'top': 0 });
    window.scrollTo(0, position);
    flag = false;
  }
  $('.js-drawer').toggleClass('is-active');
  return false;
});

//スムーススクロール
$('a[href^="#"]').click(function () {
  var header = $('.js-header').innerHeight();
  var id = $(this).attr('href');
  var position = 0;
  if (id != '#') {
    var position = $(id).offset().top - header;
  }

  $('body, html').animate({
    scrollTop: position
  }, 1000);
});

//ヘッダーメニューカレント表示
function currentNav(navItem) {
  var header = $('.js-header').innerHeight();
  var array = [];

  $(navItem).each(function (i) {
    var navHref = $(this).attr('href');
    array.push([]);
    array[i].key = $(this);
    array[i].position = $(navHref).offset().top - header - 1;
  });

  $(window).scroll(function () {
    for (var i = 0; i < array.length; i++) {
      var currentItem = array[i].key;

      if ($(window).scrollTop() > array[i].position) {
        $(navItem).removeClass('is-active');
        currentItem.addClass('is-active');
      } else if ($(window).scrollTop() < $('.js-mainvisual').innerHeight()) {
        $(navItem).removeClass('is-active');
      }
    }
  });
}

$(window).on('load resize', function () {
  currentNav('.js-header__nav li a');
});