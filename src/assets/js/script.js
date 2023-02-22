jQuery(function ($) {

   //wow
   new WOW().init();

  //ドロワー開閉 + 背景固定
  var flag = false;
  var position;

  $('.js-header__icon, .js-drawer__icon,  .js-drawer__overlay, .js-drawer__nav-items > li > a, .js-drawer__button').click(function (e) {
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


  //swiper
  let reviewSwiper = new Swiper ('.p-review__swiper-container', {
    loop: true,
    spaceBetween: 43,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      // 768px以上の場合
      768: {
        spaceBetween: 100,
      },
    },
  });

  //swiper(price)
  let priceSwiper = new Swiper ('.p-price__swiper-container01, .p-price__swiper-container02', {
    loop: true,
    spaceBetween: 53,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      // 768px以上の場合
      768: {
        spaceBetween: 100,
      },
    },
  });


  //FAQアコーディオン
  $('.js-faq__item').click(function() {
    var $answer = $(this).find('dd');
    if ($(this).hasClass('is-active')) {
      $answer.slideUp();
      $(this).removeClass('is-active');
    } else {
      $answer.slideDown();
      $(this).addClass('is-active');
    }
  });
  
  
  //FAQタブ切り替え
  $('.js-faq__tab-items > li').click(function() {
    var $target = $(this).data("target");
    $('.js-faq__tab-items > li').removeClass('is-active');
    $(this).addClass('is-active');
    $('.js-faq__items').hide();
    $('.' + $target).fadeIn();
  });

  //送信ボタン入力確認
  let $submit = $('.js-contact__button input');
  $('.js-contact__form input, .js-contact__form textarea').on('change', function () {
    if (
      $('.js-contact__form input[type="text"]').val() !== "" &&
      $('.js-contact__form input[type="email"]').val() !== "" &&
      $('.js-contact__form input[type="tel"]').val() !== "" &&
      $('.js-contact__form input[type="url"]').val() !== "" &&
      $('.js-contact__form textarea').val() !== "" &&
      $('.js-contact__form input[name="radio"]').prop('checked') === true
    ) {
      $submit.prop('disabled', false);
      $submit.addClass('is-active');
    } else {
      $submit.removeClass('is-active');
      $submit.prop('disabled', true);
    }
  });

});