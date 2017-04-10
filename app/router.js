'use strict';

module.exports = app => {
    app.get('/', 'main.index')//page入口
    app.get('/api/sp/getObligatoryList', 'study.getObligatoryList')//get
    app.get('/api/sp/getElectiveList', 'study.getElectiveList')//get
    app.get('/api/sp/getInterestList', 'study.getInterestList')//get

    //app.resources('viewlogs','/viewlog',)
    app.post('/api/sp/getSpDetail', 'study.getSpDetail')//get
    app.get('/api/sp/getCommentList', 'comment.getCommentList')//get
    app.post('/api/sp/addComment', 'comment.create')//post
};
