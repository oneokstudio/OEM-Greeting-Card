var sources = [
  //__uri('../img/bg_share.png')
]
loadImg(sources, main);

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
      //当所有图片加载完成时，执行回调函数callback
      if (++loadedCount >= totalCount) {
        callback && callback();
      }
    };
  }
}