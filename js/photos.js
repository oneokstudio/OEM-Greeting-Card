function startCarousel () {
  var owl = $("#carouselContainer");
  var currentIndex = 3;
  var currentSrc = './img/photos/1-lg.jpg';
  var $imgDetail = $('#imgDetail');
  var $currentImgDom = $imgDetail.find('.current-img');

  $('.poem').hide();
  owl.show();
  owl.owlCarousel({
    loop: true,
    autoplay: true,
    items: 1,
    lazyLoad: true,
    autoplayTimeout: 3000
  });
  owl.on('drag.owl.carousel', function (e) {
    owl.trigger('stop.owl.autoplay')
  });
  owl.on('changed.owl.carousel', function (property) {
    currentIndex = property.item.index;
    currentSrc = $(property.target).find(".owl-item").eq(currentIndex).find("img").attr('src');
    currentSrc = currentSrc.substring(0, currentSrc.length-4) + '-lg.jpg';
    showImgDetail();
  });

  $('.owl-item').on('click', function (event) {
    owl.trigger('pause.owl.autoplay');
    showImgDetail();
    $imgDetail.show();
  });

  $('.btn-close').click(function () {
    $imgDetail.hide();
    owl.trigger('play.owl.autoplay');
  });
  $('.btn-continue').click(function () {
    owl.trigger('play.owl.autoplay');
  });
  $currentImgDom.click(function () {
    owl.trigger('pause.owl.autoplay');
  });

  function showImgDetail() {
    $currentImgDom.html('<img src="' + currentSrc + '" alt="">');
    //setTimeout(function () {
    //  $currentImgDom.css({top: ($imgDetail.height() - $currentImgDom.find('img').height()) / 2});
    //}, 100);
  }
}