/**
 * Created by 1 on 2017/4/7.
 */
'use strict';

module.exports = app => {
    class ViewlogController extends app.Controller {
        * create() {
            const _param = this.ctx.rquest.body
            let view_log = {
                sp_id: 1,
                custno: '8581236'
            }
            yield this.ctx.model.Viewlog.create(view_log)
        }
    }
}
