<template>
  <div id="app">
<router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
#app,html,body{
  height: 100%;
  margin: 0;
  /* background-color: #a7d7c9; */
  background: url('./assets/2.png');
  background-size: contain;
}
</style>
