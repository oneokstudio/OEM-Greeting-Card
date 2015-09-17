//$(function () {
  var owl = $("#carouselContainer");
  var currentIndex = 3;
  var currentSrc = '';
  var $imgDetail = $('#imgDetail');
  var $currentImgDom = $imgDetail.find('.current-img');

  owl.owlCarousel({
    loop: true,
    autoplay: true,
    items: 1,
    lazyLoad:true,
    autoplayTimeout: 2000
  });
  owl.on('drag.owl.carousel', function (e) {
    owl.trigger('stop.owl.autoplay')
  });
  owl.on('changed.owl.carousel',function(property){
    currentIndex = property.item.index;
    currentSrc = $(property.target).find(".owl-item").eq(currentIndex).find("img").attr('src');
    showImgDetail();
  });

  $('.owl-item').on('click', function(event){
    owl.trigger('pause.owl.autoplay');
    showImgDetail();
    $imgDetail.show();
  });

  $('.btn-close').click(function () {
    $imgDetail.hide();
    owl.trigger('play.owl.autoplay');
  });
  $('.btn-continue').click(function () {
    console.log('img continue');
    owl.trigger('play.owl.autoplay');
  });
  $currentImgDom.click(function () {
    owl.trigger('pause.owl.autoplay');
    console.log('img dom');
  });

  function showImgDetail () {
    $currentImgDom.html('<img src="' + currentSrc + '" alt="">');
    //setTimeout(function () {
    //  $currentImgDom.css({top: ($imgDetail.height() - $currentImgDom.find('img').height()) / 2});
    //}, 100);
  }

//})