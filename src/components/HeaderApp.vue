
<script>
import Vue from 'Vue'
  const HeaderApp = Vue.component('header-app', {
    render (createElement) {
      return createElement(
        'h' + this.level,   // tag name 标签名称
        this.$slots.default // 子组件中的阵列
      )
    },
    props: {
      level: {
        type: Number,
        required: true
      }
    }
  })

export default HeaderApp
</script>

<style lang="scss">

</style>
