/**
 * Created by 1 on 2017/3/22.
 */

module.exports = app => {
    app.beforeStart(function* () {
        // 应用会等待这个函数执行完成才启动
        app.logger.info("应用服务器启动")
    });
}