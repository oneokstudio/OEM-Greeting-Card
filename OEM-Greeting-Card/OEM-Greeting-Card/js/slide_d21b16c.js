var Slide = {
  ele: null,
  windowH: null,
  slideH: null,

  init: function () {
    this.windowH = $(window).height();
    this.ele = $('.slide');

    this.ele.css({
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      overflow: 'hidden',
      zIndex: 11111
    });

    var that = this;
    this.ele.children().each(function (index) {
      var $this = $(this);
      var $content = $this.find('.slide-item-content');
      $this.data('index', index);
      $this.find('.slide-back').data('index', index);
      $this.find('.slide-forward').data('index', index);

      $this.css({
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0
      });
      $content.css({
        position: 'absolute',
        left: 0,
        top: 0
      });

      if ($content.height() > that.windowH) {
        that.slideH = $content.height();
        $content.css({top: 0});
      } else {
        that.slideH = that.windowH;
        $content.css({top: (that.windowH - $content.height()) / 2});
      }
      $this.css({
        top: index * that.slideH,
        height: that.slideH
      });
    });

    $('.slide-back').click(function () {
      var $this = $(this);
      var index = $this.data('index');
      that.ele.animate({ scrollTop:  that.slideH * (index - 1)}, 1000);
    });
    $('.slide-forward').click(function () {
      var $this = $(this);
      var index = $this.data('index');
      that.ele.animate({ scrollTop:  that.slideH * (index + 1)}, 1000);
    });
    $('.slide-close').click(function () {
      that.ele.hide();
    });
  }
}