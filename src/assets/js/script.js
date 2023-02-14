//ドロワー開閉 + 背景固定
var flag = false;
var position;

$('.js-header__icon, .js-header__drawer-overlay, .js-header__nav-items > li > a').click(function (e) {
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
  $('.js-header__nav, .js-header__drawer-overlay').toggleClass('is-active');
  return false;
});

//スムーススクロールはここに表示

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