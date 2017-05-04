/**
 * 通用api类
 */
const path = require("path");
const fs = require("fs");
const gm = require("gm");
const sendToWormhole = require("stream-wormhole")
const isdebug = process.env.NODE_ENV !== "production";
module.exports = app => {
    class CommonController extends app.Controller {
        //单个图库列表获取
        //分页
        *getImageList() {
            const {pageSize, current, userid} = this.ctx.query;
            let offset = (current - 1) * pageSize;
            const galleryTotal = yield this.ctx.model.Gallery.count({
                where: {
                    userid: userid
                }
            });
            const galleryList = yield this.ctx.model.Gallery.findAll({
                where: {
                    userid: userid
                },
                order: "createdAt DESC",
                offset: offset,
                limit: parseInt(pageSize)
            });
            this.ctx.body = {
                status: 200,
                galleryList: galleryList,
                galleryTotal: galleryTotal
            };
            this.ctx.status = 200;
        }

        //处理多个图片上传
        *doImageUpload() {
            const userid = this.ctx.session.userinfo.userid;
            // console.log(userid)
            const parts = this.ctx.multipart();
            let part;
            while ((part = yield parts) != null) {
                if (part.length) {
                    // arrays are busboy fields
                    // console.log("field: " + part[0]);
                    // console.log("value: " + part[1]);
                    // console.log("valueTruncated: " + part[2]);
                    // console.log("fieldnameTruncated: " + part[3]);
                } else {
                    if (!part.filename) {
                        // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
                        // 需要做出处理，例如给出错误提示消息
                        return;
                    }
                    // otherwise, it's a stream
                    // console.log("field: " + part.fieldname);
                    // console.log("filename: " + part.filename);
                    // console.log("encoding: " + part.encoding);
                    // console.log("mime: " + part.mime);
                    // console.log(part)
                    // 文件处理，上传到云存储等等
                    let result;
                    console.log();
                    try {
                        const new_dir = `app/public/img/new/${userid}/`;
                        fs.exists(new_dir, function (exists) {
                            if (!exists) {
                                fs.mkdir(new_dir);
                            }
                        });
                        const filepath =
                            "app/public/img/old/" + path.basename(part.filename);
                        // console.log(filepath)
                        result = yield app.uploadImg(
                            part,
                            filepath,
                            part.filename,
                            new_dir
                        );
                        if (result) {
                            //添加用户图库
                            let _param = {
                                name: part.filename,
                                jpgurl: isdebug ? this.ctx.request.header.origin + "/" + result.jpgurl.substring(4) : this.ctx.request.header.origin + "/study/" + result.jpgurl.substring(4),
                                webpurl: isdebug ? this.ctx.request.header.origin + "/" + result.webpurl.substring(4) : this.ctx.request.header.origin + "/study/" + result.webpurl.substring(4),
                                userid: userid,
                                hw: result.hw
                            };
                            console.log(_param)
                            yield app.model.Gallery
                                .create(_param, {
                                    isNewRecord: true
                                })
                                .then(function (gallery) {
                                    if (!gallery) {
                                        this.ctx.body = {status: 202, msg: "插入异常"};
                                        this.ctx.status = 200;
                                    }
                                });
                        }
                    } catch (err) {
                        // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
                        yield sendToWormhole(part);
                        throw err;
                    }
                    this.ctx.body = {status: 200};
                    this.ctx.status = 200;
                }
            }
        }

        /*获取视频列表*/
        /*分页*/
        *getVedioList() {
            const {pageSize, current, userid} = this.ctx.query;
            let offset = (current - 1) * pageSize;
            const vedioTotal = yield this.ctx.model.Vedio.count({
                where: {
                    userid: userid
                }
            });
            const vedioList = yield this.ctx.model.Vedio.findAll({
                where: {
                    userid: userid
                },
                order: "createdAt DESC",
                offset: offset,
                limit: parseInt(pageSize)
            });
            this.ctx.body = {
                status: 200,
                vedioList: vedioList,
                vedioTotal: vedioTotal
            };
            this.ctx.status = 200;
        }

        /*视频上传*/
        *doVedioUpload() {
            const userid = this.ctx.session.userinfo.userid;
            const parts = this.ctx.multipart();
            let part;
            while ((part = yield parts) != null) {
                if (part.length) {
                    // arrays are busboy fields
                    console.log("field: " + part[0]);
                    console.log("value: " + part[1]);
                    console.log("valueTruncated: " + part[2]);
                    console.log("fieldnameTruncated: " + part[3]);
                } else {
                    if (!part.filename) {
                        // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
                        // 需要做出处理，例如给出错误提示消息
                        return;
                    }
                    // otherwise, it's a stream
                    console.log("field: " + part.fieldname);
                    console.log("filename: " + part.filename);
                    console.log("encoding: " + part.encoding);
                    console.log("mime: " + part.mime);
                    // 文件处理，上传到云存储等等
                    let result;
                    try {
                        const vedio_dir = `app/public/vedio/${userid}/`;
                        if (!fs.existsSync(vedio_dir)) {
                            fs.mkdirSync(vedio_dir);
                        }
                        result = yield app.uploadVedio(part, vedio_dir);
                        if (result) {
                            console.log(result);
                            //添加用户视频库
                            let _param = {
                                name: part.filename,
                                vediourl: isdebug ? this.ctx.request.header.origin + "/" + result.vediourl.substring(4) : this.ctx.request.header.origin + "/study/" + result.vediourl.substring(4),
                                post: isdebug ? this.ctx.request.header.origin + "/" + result.post.substring(4) : this.ctx.request.header.origin + "/study/" + result.post.substring(4),
                                duration: result.duration,
                                userid: userid
                            };
                            yield app.model.Vedio
                                .create(_param, {
                                    isNewRecord: true
                                })
                                .then(function (vedio) {
                                    if (!vedio) {
                                        this.ctx.body = {status: 202, msg: "插入异常"};
                                        this.ctx.status = 200;
                                    }
                                });
                        }
                    } catch (err) {
                        // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
                        yield sendToWormhole(part);
                        throw err;
                    }
                    this.ctx.body = {status: 200};
                    this.ctx.status = 200;
                }
            }
        }

        /*获取批量文件*/
        /*分页*/
        *getDocumentList() {
            const {pageSize, current, userid} = this.ctx.query;
            let offset = (current - 1) * pageSize;
            const documentTotal = yield this.ctx.model.Document.count({
                where: {
                    userid: userid
                }
            });
            const documentList = yield this.ctx.model.Document.findAll({
                where: {
                    userid: userid
                },
                order: "createdAt DESC",
                offset: offset,
                limit: parseInt(pageSize)
            });
            this.ctx.body = {
                status: 200,
                documentList: documentList,
                documentTotal: documentTotal
            };
            this.ctx.status = 200;
        }

        /*文档上传*/
        /*限定 ppt | pdf | doc | docx | xls | xlsx * */
        *doDocumentUpload() {
            const userid = this.ctx.session.userinfo.userid;
            const parts = this.ctx.multipart();
            let part;
            while ((part = yield parts) != null) {
                if (part.length) {
                    // arrays are busboy fields
                    console.log("field: " + part[0]);
                    console.log("value: " + part[1]);
                    console.log("valueTruncated: " + part[2]);
                    console.log("fieldnameTruncated: " + part[3]);
                } else {
                    if (!part.filename) {
                        // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
                        // 需要做出处理，例如给出错误提示消息
                        return;
                    }
                    // otherwise, it's a stream
                    console.log("field: " + part.fieldname);
                    console.log("filename: " + part.filename);
                    console.log("encoding: " + part.encoding);
                    console.log("mime: " + part.mime);
                    // 文件处理，上传到云存储等等
                    let result;
                    try {
                        const document_dir = `app/public/document/${userid}/`;
                        if (!fs.existsSync(document_dir)) {
                            fs.mkdirSync(document_dir);
                        }
                        console.log(part)
                        result = yield app.uploadDocument(part, document_dir);
                        if (result) {
                            console.log(result);
                            //添加文档
                            let _param = {
                                name: part.filename,
                                url: isdebug ? this.ctx.request.header.origin + "/" + result.url.substring(4) : this.ctx.rquest.header.origin + "/study/" + result.url.substring(4),
                                size: result.size,
                                userid: userid,
                                type: result.type
                            };
                            yield app.model.Document
                                .create(_param, {
                                    isNewRecord: true
                                })
                                .then(function (document) {
                                    if (!document) {
                                        this.ctx.body = {status: 202, msg: "插入异常"};
                                        this.ctx.status = 200;
                                    }
                                });
                        }
                    } catch (err) {
                        // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
                        yield sendToWormhole(part);
                        throw err;
                    }
                    this.ctx.body = {status: 200};
                    this.ctx.status = 200;
                }
            }
        }
    }
    return CommonController;
};
