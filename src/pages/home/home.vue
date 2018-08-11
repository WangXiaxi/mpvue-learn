<template>
  <div class="home child-view">
    <div class="home-header">
      <router-link to="/site/index/search" tag="div" class="btn-opcity"></router-link>
      <a href="tel:4006610571" class="btn-phone"></a>
    </div>

    <div class="home-banner" v-if="optionBanner.length>0">
      <div class="banner-swiper">
        <swiper :indicator-dots="false" interval="5000" duration="1000" :autoplay="true" v-if="optionBanner.length>0">
           <block v-for="(item, index) in optionBanner" :key="index">
            <swiper-item>
              <image :src="URL + item.img" class="slide-image"/>
            </swiper-item>
          </block>
        </swiper>
      </div>
      <div class="w-bg"></div>
    </div>

    <div class="copy-right">
      Copyright © 2018 忆杭网版权所有
    </div>
  </div>
</template>

<script>
import { getHome } from '@/api/api.js'
import { URL } from '@/api/config.js'

export default {
  data () {
    return {
      URL,
      optionBanner: []
    }
  },
  created () {
    getHome().then((res) => {
      console.log(res)
      if (res.code === 1) {
        this.optionBanner = res.data.homeSlide
        this.optionHot = res.data.finegoodsRows
        this.newgoodsRows = res.data.newgoodsRows
      }
    })
  },
  methods: {

  }
}
</script>
<style lang="stylus">
.swiper-container-horizontal
  .home-swiper-pagination
    position: absolute
    z-index: 1
    text-align: center
    bottom: 16px !important
    .swiper-pagination-bullet
      margin: 0 3px
      opacity: 1
      background: RGB(204, 204, 204)
      transition: all 0.3s
      &.swiper-pagination-bullet-active
        background: RGB(255, 255, 255)
        width: 18px
        border-radius: 5px
</style>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.home
  background: #f2f2f2
  padding-top: 44px
  .spilter
    width: 100%
    height: 10px
    background: #F2F2F2
.home-header
  position: fixed
  top: 0
  z-index: 100
  width: 100%
  max-width: 750px; /*no*/
  height: 44px
  background: #266E0A 50% 50%/100% 100% no-repeat
  bg-image('http://hz.ehanone.com/views/mobile_fun/javascript/main/static/img/topbg@3x.7c86438.png')
  .btn-phone
    position: absolute
    width: 45px
    height: 44px
    right: 0
    top: 0
  .btn-opcity
    width: 240px
    height: 42px
    position: absolute
    right: 46px
    top: 0
.home-banner
  width: 100%
  position: relative
  height: 165px
  overflow: hidden
  background: #FFFFFF
  .banner-swiper
    swiper
      height: 165px
      image
        width: 100%
        height: 165px
  .w-bg
    position: absolute
    z-index: 1
    top: 155px
    left: 50%
    transform: translateX(-50%)
    background: #FFFFFF
    width: 328%
    padding-top: 100%
    border-radius: 50% 50% 0 0
.home-nav
  width: 100%
  height: 90px
  background: #FFFFFF
  .nav
    display: flex
    position: relative
    li
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      flex: 1
      width: 0
      padding-top: 11px
      i
        display: block
        width: 46px
        height: 46px
        margin-bottom: 9px
        background: 50% 50%/100% 100% no-repeat
        // &.icon-img-nav5
        //   bg-image("~common/images/home-nav5")
        // &.icon-img-nav4
        //   bg-image("~common/images/home-nav4")
        // &.icon-img-nav3
        //   bg-image("~common/images/home-nav3")
        // &.icon-img-nav2
        //   bg-image("~common/images/home-nav2")
        // &.icon-img-nav1
        //   bg-image("~common/images/home-nav1")
      span
        font-size: 12px
        color: #666666
.home-hot
  padding: 16px 0 12px
  position: relative
  background: #FFFFFF
  .hot-swiper
    padding-left: 12px
    .swiper-slide
      width: 102px
      &:last-child
        margin-right: 12px
  .hot-item
    display: block
    width: 102px
    img
      width: 102px
      height: 102px
    .info
      position: relative
      .tit
        font-size: 12px
        margin-top: 5px
        text-align: center
        no-wrap()
      .price
        margin-top: 12px
        font-size: 12px
        color: RGB(235, 18, 18)
        line-height: 12px
        .tip
          font-size: 10px
      .sell-num
        position: absolute
        right: 0
        bottom: 0
        font-size: 10px
        line-height: 12px
.home-pick
  background: #FFFFFF
  padding: 20px 12px
  display: flex
  .icon-img-pick
    display: block
    width: 46px
    height: 52px
    background: right center/100% 100% no-repeat
    // bg-image("~common/images/home-pick")
  .pick-swiper
    margin-left: 10px
    flex: 1
    width: 0
    height: 52px
    display: flex
    border-left: 1px solid #E6E6E6
    padding-left: 10px
    .pick-swiper
      height: 52px
      overflow: hidden
    .swiper-slide
      height: 52px
      width: 100%
    .item-pick
      display: block
      position: relative
      width: 100%
      height: 52px
      padding-right: 62px
      h3
        display: block
        flex: 1
        width: 100%
        height: 100%
        position: relative
        .tit
          height: 32px
          font-size: 12px
          line-height: 16px
          display: block
          overflow: hidden
          color: #FF8F00
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
        .price
          position: absolute
          bottom: 0
          left: 0
          font-size: 18px
          color: #EB1212
          span
            font-size: 12px
        .pick-more
          font-size: 12px
          position: absolute
          right: 0
          bottom: 0
          line-height: 18px
          color: #EB1212
          padding-right: 12px
          background: right center/auto 10px no-repeat
          // bg-image("~common/images/more")
      img
        position: absolute
        right: 0
        top: 0
        display: block
        width: 52px
        height: 52px
.home-floor
  position: relative
  padding-bottom: 15px
  background: #FFFFFF
  .tit-tip
    position: relative
    width: 104px
    height: 30px
    font-size: 16px
    text-align: center
    color: #fff
    line-height: 30px
    border-radius: 0 15px 15px 0
    z-index: 1
  .floor-banner
    display: block
    position: relative
    img
      display: block
      width: 100%
      height: 165px
      background: #F9F9F9 url("~common/images/logo.png") 50% 50%/auto no-repeat
      margin-top: -15px
  .floor-goods
    overflow: hidden
    .good-item
      width: 50%
      float: left
      padding: 12px
      .tit
        font-size: 14px
        line-height: 16px
        color: #666666
        no-wrap()
      .des
        height: 12px
        margin-top: 7px
        color: #999999
        font-size: 12px
      .bot-part
        position: relative
        overflow: hidden
        margin-top: 10px
        .left
          width: 50%
          float: left
          .price
            font-size: 0
            color: #EB1212
            padding-top: 5px
            .big-num
              font-size: 16px
          .red-btn
            margin-top: 35px
            background: #EB1212
            color: #FFFFFF
            border-radius: 10px
            height: 17px
            padding: 4px 0
            line-height: 1
            font-size: 10px
            width: 55px
            text-align: center
        .right
          width: 50%
          float: left
          img
            width: 100%
            background: #F9F9F9 url("~common/images/logo.png") 50% 50%/50% auto no-repeat
  &.floor-1
    .tit-tip
      background: linear-gradient(to right, #FF9F41, #FD7700)
  &.floor-2
    .tit-tip
      background: linear-gradient(to right, #3ABEFE, #00A9FC)
  &.floor-3
    .tit-tip
      background: linear-gradient(to right, #FE5D4E, #FD1702)
  &.floor-4
    .tit-tip
      background: linear-gradient(to right, #01FEB7, #0AE6A9)
  &.floor-5
    .tit-tip
      background: linear-gradient(to right, #B163FF, #7E05FA)
  &.floor-6
    .tit-tip
      background: linear-gradient(to right, #4DAA29, #256D09)
  &.floor-7
    .tit-tip
      background: linear-gradient(to right, #7ED3DB, #05CBE0)
  &.floor-8
    .tit-tip
      background: linear-gradient(to right, #43406A, #0F034D)
  &.floor-1, &.floor-3, &.floor-5
    .floor-goods
      .good-item:nth-child(2n)
        background: #F2F2F2
  &.floor-2, &.floor-4, &.floor-6
    .floor-goods
      .good-item:nth-child(2n + 1)
        background: #F2F2F2
.pub-tit
  height: 16px
  position: relative
  padding: 0 12px
  margin-bottom: 13px
  h3
    line-height: 16px
    font-size: 10px
    color: RGB(235, 18, 18)
    vertical-align: middle
    border-left: 2px solid #266E0A
    padding-left: 10px
    span
      vertical-align: middle
    .tit
      font-size: 16px
      color: RGB(17, 17, 17)
      margin-right: 7px
.more
  position: absolute
  right: 12px
  top: 0
  height: 16px
  line-height: 16px
  font-size: 0
  padding-right: 12px
  background: right center/auto 12px no-repeat
  // bg-image("~common/images/more")
  span
    color: RGB(235, 18, 18)
    font-size: 12px
.copy-right
  text-align: center
  line-height: 50px
  color: #999999
  margin-top: 10px
</style>
