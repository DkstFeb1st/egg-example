var CryptoJS = require("crypto-js");


module.exports = app => {
    class User extends app.Service {

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
