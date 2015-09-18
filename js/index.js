$(function () {
  var windowH = $(window).height();
  $('.wrapper').height(windowH);

  $(document).octoberLeaves({
    leafStyles: 1,
    numberOfLeaves: 3,
    cycleSpeed: 40
  })
  $(document).octoberLeaves('start');

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

  //$('#lake-img').lake({
  //  'speed': 1,
  //  'scale': 0.5,
  //  'waves': 10
  //});
  $('#menu1').click(function () {
    $('.text').html('能效+ 工业智造的4大价值体现');
  });
  $('#menu2').click(function () {
    $('.text').html('精益生产');
  });
  $('#menu3').click(function () {
    $('.text').html('智能工厂/设备');
  });
})