/**
 * 视频服务
 */

module.exports = app => {
    class Vedio extends app.Service {
        /*
         * 修改视频逻辑
         * */
        * update(_param) {
            return yield this.ctx.model.Vedio
                .update(_param, {
                    where: {
                        id: _param.id
                    }
                })
                .then(function (affectedCount) {
                    if (affectedCount[0] > 0) {
                        return true;
                    } else {
                        return false;
                    }
                });
        }

        *delete(_param) {
            return yield this.ctx.model.Vedio
                .destory({
                    where: {
                        id: _param.id
                    }
                })
                .then(function (affectedCount) {
                    if (affectedCount[0] > 0) {
                        return true;
                    } else {
                        return false;
                    }
                });
        }
    }
    return Vedio
}

