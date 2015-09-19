$(function () {
  var windowH = $(window).height();
  $('.wrapper').height(windowH);
  $('.text').css({top: (windowH - $('.text').height()) / 2});

  $('.poem').click(function () {
    startCarousel();
  });
  $('#menu1').click(function () {
    $('.text').html('能效+ 工业智造的4大价值体现');
  });
  $('#menu2').click(function () {
    $('.text').html('精益生产');
  });
  $('#menu3').click(function () {
    $('.text').html('智能工厂/设备');
  });

  animatePoem();
  startRipples();
  startCloud();
  startLeaves();


  function startRipples () {
    $('.lake').ripples({
      resolution: 100,
      dropRadius: 20,
      perturbance: 0.04,
      interactive: true
    });

    setInterval(function() {
      var $el = $('.lake');
      var x = Math.random() * $el.outerWidth();
      var y = Math.random() * $el.outerHeight();
      var dropRadius = 20;
      var strength = 0.04 + Math.random() * 0.04;

      $el.ripples('drop', x, y, dropRadius, strength);
    }, 1500);
  }
  function startLeaves () {
    $('.sidebar').octoberLeaves({
      leafStyles: 1,
      numberOfLeaves: 2,
      cycleSpeed: 40
    })
    $('.sidebar').octoberLeaves('start');
  }
  function startCloud () {
    var animate = $('.cloud');
    function loopbackground() {
      animate.css('background-position', '0px 0px');
      $({position_x: 0, position_y: 0}).animate({position_x: -5000, position_y: 0}, {
        duration: 600000,
        easing: 'linear',
        step: function() {
          animate.css('background-position', this.position_x+'px '+this.position_y+'px');
        },
        complete: function() {
          loopbackground();
        }
      });
    }
    loopbackground();
  }
  function animatePoem() {
    $('.poem').children().each(function (index) {
      var $this = $(this);
      setTimeout(function () {
        //$this.animate({
        //  marginLeft: '0',
        //  opacity: 1
        //}, 1500);
        $this.fadeIn('slow');
      }, 1500*index);
      console.log(index);
    })
  }
})