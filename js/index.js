var main = function () {
  var Server = {
    wxConfig: 'http://studio.windra.in/OEM-Greeting-Card/backend/card_share_wx.php',
    getGreeting: 'http://studio.windra.in/OEM-Greeting-Card/backend/card_info.php',
    postGreeting: 'http://studio.windra.in/OEM-Greeting-Card/backend/submit_cards.php',
    postFeedback: 'http://studio.windra.in/OEM-Greeting-Card/backend/submit_feedback.php'
  }
  var windowH = $(window).height();

  var Query = function () {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = pair[1];
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [ query_string[pair[0]], pair[1] ];
        query_string[pair[0]] = arr;
      } else {
        query_string[pair[0]].push(pair[1]);
      }
    }
    return query_string;
  }();

  $('.wrapper').height(windowH);
  $('.text').css({top: (windowH - 292 - 460)/2 + 292 - $('.text').height()/2});

  $('.poem').click(function () {
    startCarousel();
  });
  $('#menu1').click(function () {
    $('.slide').show();
  });
  $('.light-1').click(function () {
    $('.slide').show();
  });
  $('#menu2').click(function () {
    $('#custom-sender').val($('.text-1 .sender').html());
    $('#custom-receiver').val($('.text-1 .receiver').html());
    $('#custom-words').val($('.text-1 .text-content').html());
    $('.custom-container').show();
  });
  $('.light-2').click(function () {
    $('#custom-sender').val($('.text-1 .sender').html());
    $('#custom-receiver').val($('.text-1 .receiver').html());
    $('#custom-words').val($('.text-1 .text-content').html());
    $('.custom-container').show();
  });
  $('#menu3').click(function () {
    $('.feedback-container').show();
  });
  $('.light-3').click(function () {
    $('.feedback-container').show();
  });
  $('.slide-go-feedback').click(function () {
    $('.slide').hide();
    $('.feedback-container').show();
  });
  $('#stone3').click(function () {
    $('.share-mask').show();
  });

  getText();
  animatePoem();
  startCloud();
  startLeaves();
  startFish();
  Slide.init();

  WX.init({
    signUrl: Server.wxConfig,
    share: {
      title: '施耐德预祝您中秋快乐！',
      desc: '共享交流与探索的喜悦，共谱行业发展升级的美好图景。',
      link: location.href,
      imgUrl: 'http://studio.windra.in/OEM-Greeting-Card/img/share_icon.png'
    }
  });
  $('.feedback-container').form({
    method: 'post',
    url: Server.postFeedback,
    success: function (res) {
      alert(res.msg);
      $('.feedback-container').hide();
    }
  });
  $('.custom-container').form({
    method: 'post',
    url: Server.postGreeting,
    success: function (res, formData) {
      if (res.code == 200) {
        alert('创建成功！点击右上角分享给好友吧~');
        $('.custom-container').hide();
        sender = formData.sender;
        receiver = formData.receiver;
        words = formData.words;
        refreshText();

        WX.setShare( {
          title: '施耐德预祝您中秋快乐！',
          desc: '共享交流与探索的喜悦，共谱行业发展升级的美好图景。',
          link: changeURLArg(location.href, 'card_id', res.card_id),
          imgUrl: 'http://studio.windra.in/OEM-Greeting-Card/img/share_icon.png'
        });
      } else {
        alert(res.msg);
      }
    }
  });
  $('.btn-preview').click(function () {
    var sender = $('#custom-sender').val();
    var receiver = $('#custom-receiver').val();
    var words = $('#custom-words').val();
    var $previewText = $('.text-2');
    $previewText.find('.receiver').html(receiver);
    $previewText.find('.sender').html(sender);
    $previewText.find('.text-content').html(words);

    $('.text-1').hide();
    $previewText.show();
    $('.custom-container').hide();
    $('.preview-modal').show();
  });
  $('.preview-modal .modal-close').click(function () {
    $('.text-1').show();
    $('.text-2').hide();
    $('.custom-container').show();
    $('.preview-modal').hide();
  });

  $('.feedback-container .modal-close').click(function () {
    $('.modal').hide();
  });
  $('.custom-container .modal-close').click(function () {
    $('.modal').hide();
  });

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
    })
  }
  function startFish() {
    Sprite.init({
      //image: __uri("../img/1.png"),
      image: "./img/1.png",
      ele: $('#fish'),
      frames: [[0, 0, 153, 72, 0, 26, 195], [153, 0, 151, 77, 0, 28, 191], [304, 0, 148, 82, 0, 32, 186], [452, 0, 147, 84, 0, 34, 185], [599, 0, 147, 85, 0, 36, 185],[746, 0, 146, 86, 0, 39, 186], [892, 0, 146, 87, 0, 42, 188], [1038, 0, 146, 86, 0, 44, 191], [1184, 0, 148, 84, 0, 45, 195], [1332, 0, 151, 80, 0, 46, 201], [1483, 0, 153, 74, 0, 47, 208], [1636, 0, 156, 68, 0, 48, 216], [1792, 0, 160, 63, 0, 48, 223], [0, 87, 162, 57, 0, 50, 229], [162, 87, 163, 58, 0, 53, 230], [325, 87, 164, 58, 0, 56, 231], [489, 87, 165, 58, 0, 60, 232], [654, 87, 164, 57, 0, 65, 233], [818, 87, 165, 58, 0, 69, 233], [983, 87, 164, 56, 0, 74, 234], [1147, 87, 163, 55, 0, 79, 234], [1310, 87, 163, 55, 0, 84, 233], [1473, 87, 163, 55, 0, 89, 233], [1636, 87, 164, 54, 0, 94, 233], [1800, 87, 164, 53, 0, 99, 233], [0, 145, 163, 54, 0, 106, 232], [163, 145, 162, 54, 0, 112, 232], [325, 145, 163, 55, 0, 118, 231], [488, 145, 161, 55, 0, 125, 231], [649, 145, 162, 56, 0, 131, 230], [811, 145, 162, 55, 0, 137, 230], [973, 145, 162, 55, 0, 143, 230], [1135, 145, 161, 55, 0, 150, 230], [1296, 145, 162, 54, 0, 155, 230], [1458, 145, 162, 54, 0, 161, 230], [1620, 145, 161, 54, 0, 167, 230], [1781, 145, 162, 53, 0, 172, 230], [0, 201, 162, 52, 0, 177, 230], [162, 201, 162, 52, 0, 182, 230], [324, 201, 163, 52, 0, 186, 229], [487, 201, 162, 52, 0, 191, 228], [649, 201, 162, 51, 0, 196, 228], [811, 201, 162, 51, 0, 201, 226], [973, 201, 161, 51, 0, 206, 225], [1134, 201, 161, 51, 0, 211, 224], [1295, 201, 161, 51, 0, 216, 223], [1456, 201, 161, 51, 0, 221, 221], [1617, 201, 160, 52, 0, 226, 219], [1777, 201, 159, 53, 0, 232, 217], [0, 254, 159, 53, 0, 237, 215], [159, 254, 159, 54, 0, 242, 212], [318, 254, 158, 55, 0, 248, 209], [476, 254, 157, 56, 0, 253, 207], [633, 254, 156, 57, 0, 259, 204], [789, 254, 154, 58, 0, 265, 200], [943, 254, 154, 60, 0, 270, 198], [1097, 254, 153, 63, 0, 275, 194], [1250, 254, 429, 81, 0, 4, 191], [0, 335, 433, 84, 0, 4, 188], [433, 335, 437, 91, 0, 5, 184], [870, 335, 439, 95, 0, 7, 181], [1309, 335, 440, 101, 0, 10, 177], [0, 436, 439, 105, 0, 15, 173], [439, 436, 440, 109, 0, 18, 170], [879, 436, 437, 114, 0, 24, 165], [1316, 436, 435, 119, 0, 30, 161], [0, 555, 431, 123, 0, 38, 157], [431, 555, 427, 127, 0, 45, 153], [858, 555, 427, 131, 0, 49, 149], [1285, 555, 422, 135, 0, 57, 144], [0, 690, 417, 139, 0, 65, 140], [417, 690, 411, 142, 0, 75, 136], [828, 690, 404, 145, 0, 85, 132], [1232, 690, 401, 149, 0, 90, 127], [1633, 690, 392, 152, 0, 102, 123], [0, 842, 382, 157, 0, 114, 118], [382, 842, 372, 165, 0, 127, 113], [754, 842, 359, 170, 0, 141, 108], [1113, 842, 355, 176, 0, 148, 102], [1468, 842, 343, 179, 0, 161, 97], [0, 1021, 330, 182, 0, 175, 90], [330, 1021, 319, 183, 0, 189, 85], [649, 1021, 308, 183, 0, 202, 79], [957, 1021, 303, 186, 0, 208, 73], [1260, 1021, 290, 186, 0, 222, 67], [1550, 1021, 278, 186, 0, 235, 61], [0, 1207, 265, 187, 0, 250, 55], [265, 1207, 252, 188, 0, 265, 49], [517, 1207, 246, 190, 0, 273, 44], [763, 1207, 232, 192, 0, 289, 37], [995, 1207, 218, 194, 0, 304, 31], [1213, 1207, 206, 196, 0, 318, 25], [1419, 1207, 196, 199, 0, 330, 18], [1615, 1207, 191, 203, 0, 337, 12], [1806, 1207, 182, 204, 0, 347, 6], [0, 1411, 174, 207, 0, 357, 0], [174, 1411, 166, 203, 0, 367, 0], [340, 1411, 156, 199, 0, 378, 0], [496, 1411, 151, 197, 0, 384, 0], [647, 1411, 143, 191, 0, 394, 0], [790, 1411, 154, 185, 0, 384, 0], [944, 1411, 166, 177, 0, 373, 0], [1110, 1411, 180, 167, 0, 360, 0], [1290, 1411, 181, 162, 0, 354, 0], [1471, 1411, 187, 151, 0, 341, 0], [1658, 1411, 201, 138, 0, 327, 0], [0, 1618, 217, 126, 0, 313, 0], [217, 1618, 230, 114, 0, 301, 0], [447, 1618, 236, 109, 0, 296, 0], [683, 1618, 245, 99, 0, 288, 0], [928, 1618, 252, 102, 0, 281, 0], [1180, 1618, 249, 113, 0, 276, 0], [1429, 1618, 251, 126, 0, 273, 0], [1680, 1618, 253, 132, 0, 271, 0], [0, 1750, 254, 144, 0, 269, 0], [254, 1750, 254, 157, 0, 268, 0], [508, 1750, 257, 170, 0, 264, 0], [765, 1750, 259, 181, 0, 261, 0], [1024, 1750, 259, 187, 0, 260, 0], [1283, 1750, 259, 197, 0, 260, 0], [1542, 1750, 256, 206, 0, 262, 0], [0, 1956, 253, 213, 0, 266, 0], [253, 1956, 251, 219, 0, 268, 0], [504, 1956, 247, 221, 0, 268, 0], [751, 1956, 78, 150, 0, 268, 75], [829, 1956, 86, 143, 0, 271, 85], [915, 1956, 101, 133, 0, 267, 98], [1016, 1956, 289, 184, 0, 89, 113], [1305, 1956, 293, 174, 0, 89, 120], [1598, 1956, 303, 152, 0, 89, 136], [0, 2177, 314, 150, 0, 88, 134], [314, 2177, 323, 147, 0, 89, 129], [637, 2177, 332, 145, 0, 90, 126], [969, 2177, 334, 141, 0, 93, 121], [1303, 2177, 343, 139, 0, 94, 119], [1646, 2177, 354, 137, 0, 92, 116], [0, 2327, 362, 141, 0, 92, 114], [362, 2327, 368, 145, 0, 93, 111], [730, 2327, 371, 145, 0, 94, 110], [1101, 2327, 372, 146, 0, 99, 108], [1473, 2327, 377, 146, 0, 100, 106], [0, 2473, 378, 145, 0, 104, 104], [378, 2473, 380, 141, 0, 107, 104], [758, 2473, 379, 141, 0, 110, 102], [1137, 2473, 380, 137, 0, 112, 102], [1517, 2473, 381, 136, 0, 116, 101], [0, 2618, 383, 135, 0, 117, 101], [383, 2618, 381, 135, 0, 122, 99], [764, 2618, 380, 134, 0, 124, 98], [1144, 2618, 378, 133, 0, 128, 96], [1522, 2618, 379, 131, 0, 130, 95], [0, 2753, 376, 130, 0, 135, 93], [376, 2753, 376, 133, 0, 137, 87], [752, 2753, 373, 136, 0, 141, 82], [1125, 2753, 374, 141, 0, 143, 73], [1499, 2753, 375, 146, 0, 146, 64], [0, 2899, 377, 151, 0, 147, 55], [377, 2899, 377, 156, 0, 150, 46], [754, 2899, 376, 157, 0, 151, 43], [1130, 2899, 377, 162, 0, 152, 34], [1507, 2899, 376, 165, 0, 153, 26], [0, 3064, 373, 167, 0, 155, 19], [373, 3064, 374, 167, 0, 155, 13], [747, 3064, 372, 168, 0, 157, 9], [1119, 3064, 372, 168, 0, 158, 2], [1491, 3064, 372, 162, 0, 158, 0], [0, 3232, 372, 155, 0, 159, 0], [372, 3232, 372, 153, 0, 160, 0], [744, 3232, 372, 152, 0, 160, 0], [1116, 3232, 372, 151, 0, 161, 0], [1488, 3232, 372, 150, 0, 161, 0], [0, 3387, 373, 149, 0, 162, 0], [373, 3387, 374, 149, 0, 162, 0], [747, 3387, 373, 147, 0, 163, 0], [1120, 3387, 363, 147, 0, 163, 0], [1483, 3387, 361, 146, 0, 164, 0], [0, 3536, 359, 146, 0, 164, 0], [359, 3536, 358, 145, 0, 165, 0], [717, 3536, 358, 145, 0, 165, 0], [1075, 3536, 358, 145, 0, 166, 0], [1433, 3536, 350, 145, 0, 167, 0], [0, 3682, 347, 145, 0, 168, 0], [347, 3682, 345, 145, 0, 169, 0], [692, 3682, 344, 145, 0, 170, 0], [1036, 3682, 345, 145, 0, 170, 0], [1381, 3682, 345, 145, 0, 173, 0], [0, 3827, 347, 145, 0, 173, 0], [347, 3827, 347, 146, 0, 175, 0], [694, 3827, 346, 147, 0, 176, 0], [1040, 3827, 165, 56, 0, 179, 91], [1205, 3827, 165, 56, 0, 180, 91], [1370, 3827, 165, 58, 0, 183, 89], [1535, 3827, 165, 59, 0, 185, 88], [1700, 3827, 165, 59, 0, 188, 87], [1865, 3827, 165, 59, 0, 190, 87], [0, 3974, 165, 59, 0, 194, 87], [165, 3974, 165, 58, 0, 196, 88], [330, 3974, 164, 54, 0, 201, 91], [494, 3974, 165, 54, 0, 203, 91], [659, 3974, 166, 54, 0, 208, 90], [825, 3974, 166, 54, 0, 212, 89], [991, 3974, 166, 56, 0, 219, 86], [1157, 3974, 164, 57, 0, 224, 84], [1321, 3974, 162, 59, 0, 234, 81], [1483, 3974, 162, 64, 0, 239, 78], [1645, 3974, 157, 74, 0, 252, 74], [1802, 3974, 154, 79, 0, 259, 71], [0, 4053, 150, 87, 0, 272, 66], [150, 4053, 148, 90, 0, 279, 63], [298, 4053, 144, 94, 0, 292, 58], [442, 4053, 143, 98, 0, 298, 54], [585, 4053, 142, 99, 0, 309, 48], [727, 4053, 142, 99, 0, 314, 45], [869, 4053, 142, 97, 0, 323, 39], [1011, 4053, 143, 96, 0, 327, 36], [1154, 4053, 143, 94, 0, 336, 30], [1297, 4053, 144, 92, 0, 340, 27], [1441, 4053, 144, 91, 0, 348, 20], [1585, 4053, 144, 90, 0, 353, 18], [1729, 4053, 146, 88, 0, 359, 12], [1875, 4053, 147, 87, 0, 363, 9], [0, 4152, 147, 87, 0, 371, 2], [147, 4152, 147, 86, 0, 376, 0], [294, 4152, 144, 82, 0, 388, 0], [438, 4152, 142, 81, 0, 394, 0], [580, 4152, 132, 80, 0, 408, 0], [712, 4152, 125, 79, 0, 415, 0], [837, 4152, 111, 77, 0, 429, 0], [948, 4152, 104, 75, 0, 436, 0], [1052, 4152, 90, 71, 0, 450, 0], [1142, 4152, 82, 68, 0, 458, 0], [1224, 4152, 66, 62, 0, 472, 0], [1290, 4152, 60, 58, 0, 478, 0], [1350, 4152, 44, 50, 0, 489, 0], [1394, 4152, 38, 45, 0, 493, 0], [1432, 4152, 27, 34, 0, 500, 0], [1459, 4152, 22, 29, 0, 503, 0], [1481, 4152, 14, 19, 0, 509, 0], [1495, 4152, 14, 13, 0, 511, 0], [1509, 4152, 6, 3, 0, 515, 0]],
    });
  }

  var receiver, sender, words;
  function getText() {
    if (Query.card_id) {
      $.ajax({
        type: 'get',
        dataType: "json",
        data: {card_id: Query.card_id},
        url: Server.getGreeting,
        success: function(res){
          if (res.code == 200) {
            receiver = res.receiver;
            sender = res.sender;
            words = res.words;
            refreshText();
          } else {
           //alert(res.msg);
          }
        }
      });
    }
  }
  function refreshText() {
    $('.text-1 .receiver').html(receiver);
    $('.text-1 .text-content').html(words);
    $('.text-1 .sender').html(sender);
  }

  function changeURLArg(url,arg,arg_val){
    var pattern=arg+'=([^&]*)';
    var replaceText=arg+'='+arg_val;
    if(url.match(pattern)){
      var tmp='/('+ arg+'=)([^&]*)/gi';
      tmp=url.replace(eval(tmp),replaceText);
      return tmp;
    }else{
      if(url.match('[\?]')){
        return url+'&'+replaceText;
      }else{
        return url+'?'+replaceText;
      }
    }
    return url+'\n'+arg+'\n'+arg_val;
  }
}