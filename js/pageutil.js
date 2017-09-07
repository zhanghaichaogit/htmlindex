/**
 * Created by zhanghaichao on 2017/9/2.
 */
;
//ajax请求通用处理
var ajaxUtil = function (url, param, fun, isloading) {
    if (isloading != null && isloading == true) {
        $.showPreloader();
    }
    $.ajax({
        type: "post",
        url: url,
        data: param,
        dataType: "json",
        timeout: 15000, //超时时间设置，单位毫秒
        success: function (data) {
            if (!data.success && data.code == "401") {
                $.toast('登陆状态异常，正在跳转...');
                window.location.href = "/error/loginerror.html";
            } else {
                if (typeof fun == 'function') {
                    fun(data);
                }
            }
        },
        complete: function (XMLHttpRequest, status) {
            if (isloading != null && isloading == true) {
                $.hidePreloader();
            }
            if (status == 'timeout') {
                $.toast("请求超时,请稍后再试");
            }
            if (status == 'error') {
                $.toast("访问异常,请稍后再试");
            }
        }
    });
}