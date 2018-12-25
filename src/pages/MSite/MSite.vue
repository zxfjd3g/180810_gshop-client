<template>
  <section class="msite">
    <!--首页头部-->
    <NavHeader :title="address.name || '正在定位中...'">
      <span class="header_search" slot="left" @click="$router.replace('/search')">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text" v-if="!user._id" @click="$router.push('/login')">登录|注册</span>
        <i class="iconfont icon-person" v-else @click="$router.push('/userinfo')"></i>
      </span>
    </NavHeader>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>

      <img src="./images/msite_back.svg" alt="back" v-else>

    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import {mapState} from 'vuex'
  import ShopList from '../../components/ShopList/ShopList.vue'

  /*
  解决swiper在vue中不能轮播的bug
    watch: 监视状态数据更新了
    $nextTick(() => {}): 界面更新了, 在回调函数中创建swiper对象

   */

  export default {

    mounted() {
      // 异步获取商家列表数据(后台==>state)
      this.$store.dispatch('getShops')
      this.$store.dispatch('getCategorys', () => { // 状态数据更新了
        this.$nextTick(() => {
          // 创建swiper对象的时机: 列表数据显示之后
          new Swiper('.swiper-container', { // 配置对象
            loop: true, // 循环轮播
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      })
      /*  // 不太好
        setTimeout(() => {
          // 创建swiper对象的时机: 列表数据显示之后
          new Swiper('.swiper-container', { // 配置对象
            loop: true, // 循环轮播
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        }, 3000)
        */
    },

    computed: {
      ...mapState({
        address: state => state.msite.address,
        categorys: state => state.msite.categorys,
        user: state => state.user.user
      }),
      categorysArr() {
        const {categorys} = this
        // 二维数组
        const bigArr = []
        // 内部的小数组(最大长度是8)
        let smallArr = []

        // 遍历总数组
        categorys.forEach(c => {

          // 将小数组保存到大数组(每个小数组只需要添加一次)
          if (smallArr.length === 0) {
            bigArr.push(smallArr)
          }

          // 将c保存到smallArr
          smallArr.push(c)

          // 一旦小数组满了, 再准备一个新的小数组
          if (smallArr.length === 8) {
            smallArr = []
          }
        })


        return bigArr
      }
    },

    watch: {
      // 注意: vue在更新状态数据后 ==> 先调用监视的回调 ==> 异步更新界面
      /*categorys () { // categorys重新赋值了, 有数据了(状态数据更新了)
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
        this.$nextTick(() => {
          // 创建swiper对象的时机: 列表数据显示之后
          new Swiper('.swiper-container', { // 配置对象
            loop: true, // 循环轮播
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }*/
    },

    components: {
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .msite //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>