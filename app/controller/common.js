/**
 * 通用api类
 */
const path = require("path");
const fs = require("fs");
const gm = require("gm");
const sendToWormhole = require("stream-wormhole")
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(path.join(__dirname, "../ffmpeg/ffmpeg.exe"));
ffmpeg.setFfprobePath(path.join(__dirname, "../ffmpeg/ffprobe.exe"));
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
                    try {
                        const new_dir = `C:/WeiXin/application/WeiXinapp/TopDiawWang/sp/image/imagec/${userid}/`;
                        fs.exists(new_dir, function (exists) {
                            if (!exists) {
                                fs.mkdir(new_dir);
                            }
                        });
                        const filepath =
                            "C:/WeiXin/application/WeiXinapp/TopDiawWang/sp/image/old/" + path.basename(part.filename);
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
                                jpgurl: isdebug ? this.ctx.request.header.origin + "/" + result.jpgurl.substring(4) : this.ctx.request.header.origin + result.jpgurl.substring(31),
                                webpurl: isdebug ? this.ctx.request.header.origin + "/" + result.webpurl.substring(4) : this.ctx.request.header.origin + result.webpurl.substring(31),
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
                        const vedio_dir = `C:/WeiXin/application/WeiXinapp/TopDiawWang/sp/video/${userid}/`;
                        if (!fs.existsSync(vedio_dir)) {
                            fs.mkdirSync(vedio_dir);
                        }
                        const vedio_codec_dir = `C:/WeiXin/application/WeiXinapp/TopDiawWang/sp/cvideo/${userid}/`;
                        if (!fs.existsSync(vedio_codec_dir)) {
                            fs.mkdirSync(vedio_codec_dir)
                        }
                        result = yield app.uploadVedio(part, vedio_dir);
                        if (result) {
                            console.log(result);
                            //添加用户视频库
                            let _param = {
                                name: part.filename,
                                vediourl: isdebug ? this.ctx.request.header.origin + "/" + result.vediourl.substring(4) : this.ctx.request.header.origin + result.vediourl.substring(31),
                                post: isdebug ? this.ctx.request.header.origin + "/" + result.post.substring(4) : this.ctx.request.header.origin + result.post.substring(31),
                                duration: result.duration,
                                userid: userid
                            };
                            var that = this
                            yield app.model.Vedio
                                .create(_param, {
                                    isNewRecord: true
                                })
                                .then(function (vedio) {
                                    if (!vedio) {
                                        this.ctx.body = {status: 202, msg: "插入异常"};
                                        this.ctx.status = 200;
                                    } else {
                                        that.ctx.runInBackground(function*() {//视频后台解码
                                            return new Promise((resolve, reject) => {
                                                var x = part
                                                ffmpeg(`${vedio_dir}${part.filename}`)
                                                    .videoCodec('libx264')
                                                    .size('320x240')
                                                    .videoBitrate('512k')
                                                    .audioBitrate('128k')
                                                    .output(`${vedio_codec_dir}${part.filename}`)
                                                    .on("end", function () {
                                                        //change video status
                                                        //codecing -> coded
                                                        //1 -> 2
                                                        console.log("end")
                                                        const result = that.ctx.model.Vedio
                                                            .update({
                                                                status: '1',
                                                                vediourl: that.ctx.request.header.origin + "/" + `${vedio_codec_dir}${x.filename}`.substring(31)
                                                            }, {
                                                                where: {
                                                                    id: vedio.id
                                                                }
                                                            })
                                                        if (!result) {
                                                            that.ctx.model.Vedio.destory({
                                                                where: {
                                                                    id: vedio.id
                                                                }
                                                            })
                                                        }
                                                    })
                                                    .on('codecData', function (data) {
                                                        console.log('Input is ' + data.audio + ' audio ' + 'with ' + data.video + ' video');
                                                    })
                                                    .on('progress', function (progress) {
                                                        console.log('Processing: ' + progress.percent + '% done');
                                                    })
                                                    .on('error', function (err) {
                                                        console.log('An error occurred: ' + err);
                                                    })
                                                    .run();
                                            })

                                        })
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

        /*获取批量音频*/
        /*分页*/
        *getAudioList() {
            const {pageSize, current, userid} = this.ctx.query;
            let offset = (current - 1) * pageSize;
            const audioTotal = yield this.ctx.model.Audio.count({
                where: {
                    userid: userid
                }
            });
            const audioList = yield this.ctx.model.Audio.findAll({
                where: {
                    userid: userid
                },
                order: "createdAt DESC",
                offset: offset,
                limit: parseInt(pageSize)
            });
            this.ctx.body = {
                status: 200,
                audioList: audioList,
                audioTotal: audioTotal
            };
            this.ctx.status = 200;
        }

        /*音频上传*/
        /*限定 mp3 |  * */
        *doAudioUpload() {
            const userid = this.ctx.session.userinfo.userid;
            const parts = this.ctx.multipart();
            let part;
            while ((part = yield parts) != null) {
                if (part.length) {
                } else {

                    if (!part.filename) {
                        // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
                        // 需要做出处理，例如给出错误提示消息
                        return;
                    }
                    // otherwise, it's a stream
                    // 文件处理，上传到云存储等等
                    let result;
                    try {
                        const audio_dir = `C:/WeiXin/application/WeiXinapp/TopDiawWang/sp/audio/${userid}/`;
                        if (!fs.existsSync(audio_dir)) {
                            fs.mkdirSync(audio_dir);
                        }
                        result = yield app.uploadAudio(part, audio_dir);
                        console.log(result);
                        if (result) {

                            //添加音频
                            let _param = {
                                name: part.filename,
                                url: isdebug ? this.ctx.request.header.origin + "/" + result.url.substring(4) : this.ctx.request.header.origin + result.url.substring(31),
                                userid: userid,
                                duration: result.duration
                            };
                            yield app.model.Audio
                                .create(_param, {
                                    isNewRecord: true
                                })
                                .then(function (audio) {
                                    if (!audio) {
                                        this.ctx.body = {status: 202, msg: "操作异常"};
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
                        const document_dir = `C:/WeiXin/application/WeiXinapp/TopDiawWang/sp/document/${userid}/`;
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
                                url: isdebug ? this.ctx.request.header.origin + "/" + result.url.substring(4) : this.ctx.request.header.origin + result.url.substring(31),
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
