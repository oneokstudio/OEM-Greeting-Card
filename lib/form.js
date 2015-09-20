(function($) {
  $.fn.form = function(options) {
    var settings = $.extend({
      url: '',
      method: '',
      data: {},
      success: null
    }, options);

    var $form = this;
    var $submit = $form.find('.btn-submit');
    var data = {};

    $submit.click(function () {
      if (verify()) {
        var _data = $.extend(true, data, settings.data);
        $.ajax({
          type: settings.method,
          dataType: "json",
          data: _data,
          url: settings.url,
          success: function(res){
           if (settings.success) {
             settings.success(res);
           }
          }
        });
      }
    });

    function verify() {
      var available = true;
      $form.find('.form-control').each(function (index) {
        var $this = $(this);
        var name = $this.attr('name');
        var value = $.trim($this.val());
        var length = $this.data('length');

        //对于单选框
        if ($this.attr('type') == 'radio') {
          if ($this.is(':checked')) {
            console.log($this.is(':checked'), value);
            data[name] = value;
          }
          return true;
        //其他
        } else if (value == '') {
          alert('请填写' + $this.data('name'));
          available = false;
          return false;
        } else if (name == 'mobile') {
          if (!verifyPhoneFormat(value)) {
            alert('手机格式不正确哦！');
            available = false;
            return false;
          }
        } else {
          if (length && length < value.length) {
            alert(name + '字数长度超啦~');
            available = false;
            return false;
          }
          data[name] = value;
        }
      });

      return available;
    }

    function verifyPhoneFormat (str) {
      if (str != null && str.length == 11) {
        var r, re;
        re = /\d*/i; //\d表示数字,*表示匹配多个数字
        r = str.match (re) ;
        return (r == str) ? true : false;
      }
      return false;
    }

    return this;
  }
})(jQuery);