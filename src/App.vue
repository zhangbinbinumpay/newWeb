<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  * {
    padding: 0;
    border: 0;
    margin: 0;
  }
  body,html{
    height: 100%;
    width: 100%;
  }
  #app {
    height: 100%;
    width: 100%;
  }
</style>
