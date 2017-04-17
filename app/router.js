'use strict';

module.exports = app => {
    const login_handler = app.middlewares.loginHandler()//判断是否登录中间件
    app.get('/weixin', 'main.weixin')//page入口
    app.get('/api/sp/getObligatoryList', login_handler, 'study.getObligatoryList')//get
    app.get('/api/sp/getElectiveList', login_handler, 'study.getElectiveList')//get
    app.get('/api/sp/getInterestList', login_handler, 'study.getInterestList')//get
    app.post('/api/sp/getSpDetail', login_handler, 'study.getSpDetail')//get
    app.get('/api/sp/getCommentList', login_handler, 'comment.getCommentList')//get
    app.post('/api/sp/addComment', login_handler, 'comment.create')//post

    app.get('/pc', 'main.pc')//page入口
    app.post('/api/sp/loginByPwd', 'user.loginByPwd')//post
    app.get('/api/sp/initial', login_handler, 'user.initial')//get
    app.get('/api/sp/getSpList', login_handler, 'study.getSpList')//get
    app.put('/api/sp/doUpdate', login_handler, 'study.doUpdate')//put

};
