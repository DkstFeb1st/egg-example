/**
 * Created by 1 on 2017/3/16.
 */

module.exports = app => {
    class User extends app.Service {
        * find() {
            const user = yield app.mysql.query(`select * from rc_zx_user`);
            return user;
        }
    }
    return User;
};
