/*
* 扩展application对象
* */
module.exports = {
    //vue服务器bundle渲染
   createRenderer (bundle, template) {
    // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    return require('vue-server-renderer').createBundleRenderer(bundle, {
        template,
        // cache: require('lru-cache')({
        //   max: 1000,
        //   maxAge: 1000 * 60 * 15
        // })
    })
}
}
