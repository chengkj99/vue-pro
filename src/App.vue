<template>
  <div id="app">
    <p>Vue Pro app</p>
    <p>app</p>
    <p>app</p>
    <div class="header">
      <HeaderApp :level="1">hahahaha</HeaderApp>
      <HeaderApp :level="2">hahahaha</HeaderApp>
      <HeaderApp :level="3">hahahaha</HeaderApp>
      <HeaderApp :level="4">hahahaha</HeaderApp>
      <HeaderApp :level="4">hahahaha</HeaderApp>
      <HeaderApp :level="4">hahahaha</HeaderApp>
      <HeaderApp :level="4">hahahaha</HeaderApp>
      <HeaderApp :level="4">hahahaha</HeaderApp>
      <FooterApp></FooterApp>
    </div>
  </div>
</template>

<script>
import HeaderApp from './components/HeaderApp.vue'
import FooterApp from './components/FooterApp.vue'
export default {
  name: 'app',
  data () {
    return {
      aa: 0
    }
  },
  created () {
    let a = 100;
    this.aa = a
  },
  components: {
    HeaderApp,
    FooterApp
  },
  methods: {
  }
}
</script>

<style lang="scss">
#app {
  display: block;
}
</style>
