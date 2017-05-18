/*
* 扩展application对象
* */
const fs = require("fs");
const gm = require("gm");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment");
require("moment/locale/zh-cn");
ffmpeg.setFfmpegPath(path.join(__dirname, "../ffmpeg/ffmpeg.exe"));
ffmpeg.setFfprobePath(path.join(__dirname, "../ffmpeg/ffprobe.exe"));
const {createBundleRenderer} = require("vue-server-renderer");
const isdebug = process.env.NODE_ENV !== "production"
module.exports = {
    aesKey: "jcx",
    //vue服务端bundle渲染
    createRenderer(bundle, template) {
    // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
        return createBundleRenderer(bundle, {
            template
            // cache: require('lru-cache')({
            //   max: 1000,
            //   maxAge: 1000 * 60 * 15
            // })
        });
    },
    uploadAudio(stream, filepath) {
        return new Promise((resolve, reject) => {
            console.log(stream)
            const ws = fs.createWriteStream(filepath + stream.filename);
            stream.pipe(ws);
            let param = {
                url: filepath + stream.filename,
                name: stream.filename
            };
            ws.on("error", function (e) {
                console.log(e);
                reject(false);
            }),
                ws.on("finish", function () {
                    resolve(param);
                });
        })
    },
    /*文档上传*/
    uploadDocument(stream, filepath) {
        return new Promise((resolve, reject) => {
            const ws = fs.createWriteStream(filepath + stream.filename);
            stream.pipe(ws);
            let param = {
                url: filepath + stream.filename,
                type: stream.filename.substring(stream.filename.indexOf(".") + 1)
            };
            ws.on("error", function () {
                console.log("error");
                reject(false);
            }), ws.on("finish", function () {
                const stat = fs.statSync(filepath + stream.filename);
                const size = stat.size.toFixed(2);
                param["size"] = size / 1000;
                resolve(param);
            });
        });
    },
    //视频上传
    //获取第一帧缩略图
    uploadVedio(stream, filepath) {
        console.log(stream);
        return new Promise((resolve, reject) => {
            const ws = fs.createWriteStream(filepath + stream.filename);
            stream.pipe(ws);
            ws.on("error", function () {
                reject(false);
            });
            ws.on("finish", function () {
                /*获取时长*/
                let url = {
                    vediourl: filepath + stream.filename,
                    post: filepath + stream.filename + ".png"
                };
                ffmpeg.ffprobe(`${filepath}${stream.filename}`, function (err,
                                                                          metadata) {
                    const duration = moment
                        .unix(metadata.streams[0].duration)
                        .subtract(8, "hours")
                        .format("HH:mm:ss");
                    url["duration"] = !err && duration;
                });

                ffmpeg(`${filepath}${stream.filename}`)
                    .takeScreenshots({
                        count: 1,
                        timemarks: ["00:00:01.000"],
                        filename: `${stream.filename}.png`,
                        folder: filepath,
                        size: "300x180"
                    })
                    .on("end", function () {
                        resolve(url);
                    });
            });
        });
    },
    //图片上传存储并压缩
    //参数 文件stream 存储路径filepath
    uploadImg(stream, filepath, filename, new_dir) {
        return new Promise((resolve, reject) => {
            const ws = fs.createWriteStream(filepath);
            stream.pipe(ws);
            ws.on("error", function () {
                reject("error");
            });
            ws.on("finish", function () {
                let filename_webp = filename.split("");
                filename_webp.splice(
                    filename.lastIndexOf("."),
                    filename_webp.length,
                    ".webp"
                );
                const webpurl = filename.indexOf(".gif") < 0
                    ? `${new_dir}${filename_webp.join("")}`
                    : `${new_dir}${filename}`;
                const jpgurl = `${new_dir}${filename}`;
                let url = {
                    webpurl: webpurl,
                    jpgurl: jpgurl
                };
                gm(filepath).size(function (err, size) {
                    if (!err) url["hw"] = (size.width / size.height).toFixed(2);
                });
                gm(filepath).resize(420, 420).noProfile().write(webpurl, function (err) {
                    if (!err) {
                        gm(filepath)
                            .resize(420, 420)
                            .noProfile()
                            .write(jpgurl, function (err) {
                                if (!err) resolve(url);
                                else reject(false);
                            });
                    } else {
                        reject(false);
                    }
                });
            });
        });
    }
};
