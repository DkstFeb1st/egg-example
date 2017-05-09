var CryptoJS = require("crypto-js");
/*
 * 企业号用户相关接口及后台用户逻辑
 * */
const corpid = 'wx365326b3672b185c'
const corpsecret = '3hX0RBs2hm2UfLc7F8LugY5503oAIPCfulf089oVu8h6fOhHiyLpnQwIZlqpcR82'
const getTokenUrl = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${corpsecret}`//获取token链接
const getUserIdUrl = `https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo`
const getLoginInfo = `https://qyapi.weixin.qq.com/cgi-bin/service/get_login_info`
const getUserInfoUrl = `https://qyapi.weixin.qq.com/cgi-bin/user/get`

module.exports = app => {
    class User extends app.Service {
        * getToken() {
            const result = yield app.curl(getTokenUrl, {
                dataType: 'json'
            })
            return result.data.access_token
        }

        * getUserInfo(_token, _code) {
            const userid_result = yield app.curl(`${getUserIdUrl}?access_token=${_token}&code=${_code}`, {
                dataType: 'json'
            })
            if (userid_result) {
                //const user_id = userid_result.data.UserId
                const userinfo_result = yield app.curl(`${getUserInfoUrl}?access_token=${_token}&userid=8581234`, {
                    dataType: 'json'
                })
                return userinfo_result.data
            }
        }

        * getUserLoginInfo(_token, _code) {
            console.log(_code)
            const userid_result = yield app.curl(`${getLoginInfo}?access_token=${_token}`, {
                method: 'POST',
                contentType: 'json',
                data: {
                    'auth_code': _code
                },
                dataType: 'json'
            })
            if (userid_result) {
                console.log(userid_result)
                const user_id = userid_result.data.user_info.userid
                const userinfo_result = yield app.curl(`${getUserInfoUrl}?access_token=${_token}&userid=${user_id}`, {
                    dataType: 'json'
                })
                return userinfo_result.data
            }
        }
        /*
         * 检查是否有管理用户
         * */
        * checkCust(_param) {
            console.log(CryptoJS.SHA1('admin123').toString())
            const cust = yield this.ctx.model.Cust.findOne({
                attributes: {exclude: ['pwd']},
                where: {
                    account: _param.account,
                    pwd: CryptoJS.SHA1(_param.pwd).toString()
                }
            })
            return cust
        }
        /*
         * 根据字典表获取职位对应的key
         * */
        * getPositionFromDict(_position) {
            const position_dict = yield this.ctx.model.Dict.findOne({
                where: {
                    label: {
                        $like: `%${_position}%`
                    },
                    type: 'job'
                }
            })
            if (position_dict.length === 0) {
                return false
            }
            return position_dict
        }
    }
    return User;
};
