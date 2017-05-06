import Vue from 'vue' //运行时构建
import App from './App.vue'

new Vue({
  el: '#app',
  render: (h) => {
    console.log('h', h)
    return h(App)
  }
})


// import Vue from 'vue/dist/vue.js' //独立构建
// // import Vue from 'vue/dist/vue.esm.js' //独立构建
// import App from './App.vue'
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// }).$mount('#app')
