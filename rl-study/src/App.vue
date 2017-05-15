<template>
  <div id="app" >
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'app',
  }
</script>

<style lang="less">

  body {

    background-color: #f5f5f5;
  }
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

  body, p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }


</style>
