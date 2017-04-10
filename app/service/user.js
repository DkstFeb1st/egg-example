/*
 * 企业号用户相关接口
 * */
const corpid = 'wx365326b3672b185c'
const corpsecret = '3hX0RBs2hm2UfLc7F8LugY5503oAIPCfulf089oVu8h6fOhHiyLpnQwIZlqpcR82'
const getTokenUrl = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${corpsecret}`//获取token链接
const getUserIdUrl = `https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo`
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
    }
    return User;
};
