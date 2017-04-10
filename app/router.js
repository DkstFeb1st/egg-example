'use strict';

module.exports = app => {
    const login_handler = app.middlewares.loginHandler()
    app.get('/', 'main.index')//page入口
    app.get('/api/sp/getObligatoryList', login_handler, 'study.getObligatoryList')//get
    app.get('/api/sp/getElectiveList', login_handler, 'study.getElectiveList')//get
    app.get('/api/sp/getInterestList', login_handler, 'study.getInterestList')//get

    //app.resources('viewlogs','/viewlog',)
    app.post('/api/sp/getSpDetail', login_handler, 'study.getSpDetail')//get
    app.get('/api/sp/getCommentList', login_handler, 'comment.getCommentList')//get
    app.post('/api/sp/addComment', login_handler, 'comment.create')//post
};
