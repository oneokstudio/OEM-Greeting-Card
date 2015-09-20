var Sprite = {
  ele: null,
  image: null ,
  frames: null ,
  curFrame: null,
  deltaTime: 100,

  init: function (config) {
    this.ele = config.ele || this.ele;
    this.image = config.image || this.image;
    this.frames = config.frames || this.frames;

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var that = this;
    setInterval(function () {
      that.play();
    }, that.deltaTime);
  },

  play: function () {
    if (this.ele) {
      var that = this;
      that.curFrame = that.frames[0];
      //console.log(that.curFrame);
      that.frames.push(that.frames.shift());

      that.ele.css({
        position: 'absolute',
        left: 0,
        top: 0,
        width: that.curFrame[2] + 'px',
        height: that.curFrame[3] + 'px',
        transform: 'translate(' + that.curFrame[5] + 'px, ' + that.curFrame[6] + 'px)',
        "background": 'url('+ that.image + ')',
        "background-position": '-' + that.curFrame[0] + 'px -' + that.curFrame[1] + 'px',
        "background-repeat": 'no-repeat'
      });
    }
  }
}