/*
 * 监听组件生命周期
 * */
export default {
  created: function () {
    console.log("mounted")
  },
  mounted: function () {
    console.log("mounted")
  },
  updated: function () {
    console.log("updated")
  },
  activated: function () {
    console.log("activated")
  },
  deactivated: function () {
    console.log("deactivated")
  },
  destroyed: function () {
    console.log("destroyed")
  }
}
