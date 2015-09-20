/**
 * @require jquery
 * @require lib/wx/jweixin-1.0.0.js
 *
 * name: wx.js
 * intro: 微信方法库
 * author: Rain
 * modified: Rain
 * date: 2015/09/20
 */

var WX = {
  config: {
    //分享相关
    signUrl: '',
    share: {
      title: document.title,
      desc: '',
      link: location.href,
      imgUrl: '',
      success: function () {}
    }
  },

  init: function (config) {
    var _this = this;
    $.extend(true, _this.config, config);
    _this.os = _this.browser();
    _this.shareMask = $('.share-mask');

    //分享
    _this.initShare();
  },

  initShare: function () {
    var _this = this;

    if (_this.os == 'wechat') {
      $.ajax({
        type: "post",
        dataType: "json",
        data: {url:location.href},
        cache: false,
        url: _this.config.signUrl,
        success: function(res){
          if(res.code == 200){
            var _data = res.data.sign;
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: 'wxb2b28f20d3f8a6e3', // 必填，公众号的唯一标识
              timestamp: _data.timestamp, // 必填，生成签名的时间戳
              nonceStr: _data.nonceStr, // 必填，生成签名的随机串
              signature: _data.signature,// 必填，签名，见附录1
              jsApiList: [
                //分享
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo'
              ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            _this.setShare(_this.config.share);
          }
        },
        error: function (jqXHR, exception) {
          _this.xhrErrorHandler(jqXHR, exception);
        }
      });
    } else {
      _this.setShare(_this.config.share);
    }

    //分享遮罩响应事件
    _this.shareMask && _this.shareMask.click(function () {
      $(this).hide();
    });
  },


  setShare: function (shareConf) {
    var _this = this;
    if (_this.os == 'wechat') {
      wx.ready(function () {
        wx.onMenuShareTimeline(shareConf);
        wx.onMenuShareAppMessage(shareConf);
        wx.onMenuShareWeibo(shareConf);
        wx.onMenuShareQQ(shareConf);
      });
    }
  },


  xhrErrorHandler: function (jqXHR, exception) {
    if (exception === 'parsererror') {
      alert('JSON 解析失败！请尝试切换网络。');
    } else if (exception === 'timeout') {
      alert('连接超时，请稍后重试~');
    } else if (jqXHR.status === 0) {
      alert('连接失败，请稍后重试~');
    } else if (jqXHR.status == 401) {
      alert('连接服务器出了些问题，登录之后也许能解决哦，灰常抱歉 > <!');
    } else if (jqXHR.status == 404) {
      alert('请求 url 无法找到。[404]');
    } else if (jqXHR.status >= 500 && jqXHR.status < 600) {
      alert('十分抱歉，服务器内部发生错误。' + jqXHR.status);
    } else {
      alert('发现未知错误。' + jqXHR.responseText);
    }
  },


  browser: function () {
    var ua = navigator.userAgent.toLowerCase();
    if (/(gifttalk)/i.test(ua)) {
      return 'gifttalk';
    } else if (/micromessenger/.test(ua)) {
      return 'wechat';
    } else if (/(iphone|ipod|ipad)/i.test(ua)) {
      return 'ios';
    } else if(/(android)/i.test(ua)) {
      return 'android';
    } else if(/(windows phone)/i.test(ua)) {
      return 'wp';
    } else {
      return 'pc';
    }
  }
}