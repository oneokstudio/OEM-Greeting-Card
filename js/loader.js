var sources = [
  './img/1.png',
  './img/bamboo.png',
  './img/bamboo1.png',
  './img/bamboo2.png',
  './img/bamboo3.png',
  './img/bg.png',
  './img/btn_close.png',
  './img/btn_tbc.png',
  './img/cloud.png',
  './img/grabbing.png',
  './img/leaf1.png',
  './img/lotus1.png',
  './img/lotus2.png',
  './img/moon.png',
  './img/shadow.png',
  './img/stone1.png',
  './img/stone2.png',
  './img/stone3.png',
  './img/news/news1.png',
  './img/news/news2.png',
  './img/news/news3.png',
  './img/news/news4.png',
  './img/news/news5.png',
  './img/photos/1.jpg',
  './img/photos/2.jpg'
]
//loadImg(sources, main);
$('.loading').hide();
main();

function loadImg(sources, callback){
  var _imgList = [], _img = null;
  var loadedCount = 0;
  var totalCount = sources.length;
  for (var i = 0; i < totalCount; i++) {
    _img = sources[i];
    _imgList[i] = new Image();
    _imgList[i].src = _img;

    //当一张图片加载完成时执行
    _imgList[i].onload = function(){
      $('.loading-info').html(loadedCount + ' / ' + totalCount);
      //当所有图片加载完成时，执行回调函数callback
      if (++loadedCount >= totalCount) {
        $('.loading').hide();
        callback && callback();
      }
    };
  }
}