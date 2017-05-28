/**
 * Created by vicient on 2017/1/10.
 */
var func = {
    /**
     * 接口定制抛出异常
     * res 上下文
     * code 状态码
     * contentType 返回类型
     * data 返回内容
     * msg 返回消息
     */
    showResult: function (res, code, contentType, data, msg, ret) {
        var _code = !arguments[1] ? '500' : arguments[1];
        var _contentType = !arguments[2] ? 'text/html;charset=UTF-8' : arguments[2];
        var _data = !arguments[3] ? null : arguments[3];
        var _msg = !arguments[4] ? 'error' : arguments[4];
        var _ret = !arguments[5] ? '1111' : arguments[5];
        console.log(_code);
        var data = {
            "ret": _ret,
            "msg": _msg,
            "data": _data
        };
        res.status(_code).send(JSON.stringify(data));
    }
};

module.exports = func;