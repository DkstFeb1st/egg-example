"use strict";
const path = require("path");
/*默认的配置文件,所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件。*/
module.exports = appInfo => {
  const config = {};

    config.keys = "jcx,xcj";

    config.middleware = ["errorHandler"];

  //404 page
    (config.notfound = {
        pageUrl: "/public/404.html"
    }), (config.errorHandler = {
        // 非 `/api/` 路径不在这里做错误处理，留给默认的 onerror 插件统一处理
        match: "/api"
    });

  config.logger = {
      level: "DEBUG"
  };

    config.bodyParser = {
        jsonLimit: "50mb",
        formLimit: "50mb"
    };
    config.multipart = {
        fileSize: "500mb",
        fileExtensions: [".doc", ".docx", ".pdf", ".ppt", ".pptx", ".xls", ".xlsx", '.zip', '.rar']
    };
    //模板配置
    config.view = {
        defaultExt: ".html",
        mapping: {
            ".ejs": "ejs",
            ".html": "ejs"
        }
    };
    config.security = {
        domainWhiteList: ['127.0.0.1', 'app.rarcbank.com', 'v.qq.com', 'open.weixin.qq.com'],
    };
    config.helper = {
        shtml: {
            whiteList: {
                a: ['class', 'href', 'width', 'height', 'type', 'name', 'size'],
                abbr: ['title'],
                address: [],
                area: ['shape', 'coords', 'href', 'alt'],
                article: [],
                aside: [],
                audio: ['autoplay', 'controls', 'loop', 'preload', 'src'],
                b: [],
                bdi: ['dir'],
                bdo: ['dir'],
                big: [],
                blockquote: ['cite'],
                br: [],
                caption: [],
                center: [],
                cite: [],
                code: [],
                col: ['align', 'valign', 'span', 'width'],
                colgroup: ['align', 'valign', 'span', 'width'],
                dd: [],
                del: ['datetime'],
                details: ['open'],
                div: ['class'],
                dl: [],
                dt: [],
                em: [],
                font: ['color', 'size', 'face'],
                footer: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                header: [],
                hr: [],
                i: [],
                img: ['src', 'alt', 'title', 'width', 'height'],
                ins: ['datetime'],
                li: [],
                mark: [],
                nav: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                section: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                table: ['width', 'border', 'align', 'valign'],
                tbody: ['align', 'valign'],
                td: ['width', 'rowspan', 'colspan', 'align', 'valign'],
                tfoot: ['align', 'valign'],
                th: ['width', 'rowspan', 'colspan', 'align', 'valign'],
                thead: ['align', 'valign'],
                tr: ['rowspan', 'align', 'valign'],
                tt: [],
                u: [],
                ul: [],
                video: ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width', 'poster', 'class'],
                iframe: ['src', 'allowfullscreen', 'frameborder'],
                source: ['src', 'type']
            }
        }
    }

    return config;
};
