"use strict";

module.exports = app => {
    const login_handler = app.middlewares.loginHandler(); //判断是否登录中间件
    //入口
    app.get("/weixin", "main.weixin"); //page入口
    app.get("/pc", "main.pc"); //page入口

    app.get("/api/sp/getObligatoryList", login_handler, "study.getObligatoryList"); //get
    app.get("/api/sp/getElectiveList", login_handler, "study.getElectiveList"); //get
    app.get("/api/sp/getInterestList", login_handler, "study.getInterestList"); //get
    app.post("/api/sp/getSpDetail", login_handler, "study.getSpDetail"); //get
    app.get("/api/sp/getCommentList", login_handler, "comment.getCommentList"); //get
    app.post("/api/sp/addComment", login_handler, "comment.create"); //post
    app.post("/api/sp/addRate", login_handler, "comment.addRate");//post
    app.post("/api/sp/addTop", login_handler, "comment.addTop");//post
    app.post("/api/sp/createTop", login_handler, "comment.createTop");//post
    app.post("/api/sp/addOrDeleteLove", login_handler, "comment.addOrDeleteLove")//post
    app.get("/api/sp/getTopList", login_handler, "comment.getTopList");//get
    app.get("/api/sp/getUserTab", login_handler, "user.getUserTab");//get
    app.get("/api/sp/getLoveStudyList", login_handler, "user.getLoveStudyList")//get
    app.get("/api/sp/getStudyingList", login_handler, "user.getStudyingList")//get


    app.post("/api/sp/loginByPwd", "user.loginByPwd"); //post
    app.post("/api/sp/loginout", login_handler, "user.loginout");//post
    app.get("/api/sp/initial", login_handler, "user.initial"); //get
    app.get("/api/sp/getSpList", login_handler, "study.getSpList"); //get
    app.put("/api/sp/doUpdate", login_handler, "study.doUpdate"); //put
    app.post("/api/sp/doCreate", login_handler, "study.doCreate"); //post
    app.get("/api/sp/viewSpDetail", login_handler, "study.viewSpDetail"); //get
    app.post("/api/sp/addCategory", login_handler, "category.addCategory"); //post
    app.post("/api/sp/updateCategory", login_handler, "category.updateCategory"); //post
    app.post("/api/sp/deleteCategory", login_handler, "category.deleteCategory");//post

    //通用
    app.get("/api/sp/getImageList", login_handler, "common.getImageList"); //get
    app.post("/api/sp/doImageUpload", login_handler, "common.doImageUpload"); //post
    app.get("/api/sp/getVedioList", login_handler, "common.getVedioList"); //get
    app.post("/api/sp/doVedioUpload", login_handler, "common.doVedioUpload"); //post
    app.get("/api/sp/getDocumentList", login_handler, "common.getDocumentList"); //get
    app.post("/api/sp/doDocumentUpload", login_handler, "common.doDocumentUpload"); //post
    app.get("/api/sp/getAudioList", login_handler, "common.getAudioList");//get
    app.post("/api/sp/doAudioUpload", login_handler, "common.doAudioUpload")//post
};
