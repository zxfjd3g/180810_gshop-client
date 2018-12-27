<template>
  <div>
    B11111组件
  </div>
</template>
<script>


  export default {

    // 适用于路由组件没有缓存
    /*mounted () {
      console.log('b1 mounted()')
      this.intervalId = setInterval(() => {
        console.log('做些事件...')
      }, 1000)
    },*/

    /*beforeDestroy() {
      clearInterval(this.intervalId)
    },*/

    beforeRouteEnter (to, from, next) {
      next(component => {
        component.intervalId = setInterval(() => {
          console.log('做些事件...')
        }, 1000)
      })
    },

    // 在当前组件离开前调用, 可以访问this
    beforeRouteLeave (to, from, next) {
      clearInterval(this.intervalId)
      next()
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>