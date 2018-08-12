<template>
  <div class="home child-view">
    <div class="home-header">
      <router-link to="/site/index/search" tag="div" class="btn-opcity"></router-link>
      <a href="tel:4006610571" class="btn-phone"></a>
    </div>
    <div class="home-banner">
      <div class="banner-swiper">
        <swiper @change="swiperHomeChange" :circular="true" class="swiper" interval="5000" duration="400" :current="currentHomeSwiper" :autoplay="true" v-if="optionBanner.length>0">
           <block v-for="(item, index) in optionBanner" :key="index">
            <swiper-item>
              <image :src="URL + item.img" class="slide-image"/>
            </swiper-item>
          </block>
        </swiper>
        <!--重置小圆点的样式  -->
        <view class="dots">  
          <block v-for="(item, index) in optionBanner" :key="index">  
            <view class="dot" :class="{active: index === currentHomeSwiper}"></view>  
          </block>  
        </view>
      </div>
      <div class="w-bg"></div>
    </div>
    <!-- 导航 -->
    <div class="home-nav">
      <div class="nav">
        <navigator url="../index/main" open-type="switchTab">
          <i class="icon-img-nav1"></i>
          <span>商品分类</span>
        </navigator>
        <navigator url="/site/index/brand">
          <i class="icon-img-nav2"></i>
          <span>名特优品牌</span>
        </navigator>
        <navigator url="/site/index/search-list?searchTitle=伴手礼&cat=14">
          <i class="icon-img-nav3"></i>
          <span>杭州礼包</span>
        </navigator>
        <navigator url="/site/index/special-zone">
          <i class="icon-img-nav4"></i>
          <span>特惠专区</span>
        </navigator>
        <navigator url="/site/index/news-list?id=9">
          <i class="icon-img-nav5"></i>
          <span>资讯中心</span>
        </navigator>
      </div>
    </div>
    <!-- 占位 -->
    <div class="spilter"></div>
    <!-- 新品专区 -->
    <div class="home-hot">
      <div class="pub-tit">
        <h3><span class="tit">优品热卖</span></h3>
        <div class="hot-tips"></div>
      </div>
      <div class="hot-swiper" v-if="newgoodsRows.length>0">
        <scroll-view :scroll-x="true" :scroll-with-animation="true">
          <div class="scroll-box">
            <navigator class="hot-item" v-for="(item, index) in newgoodsRows" :key="index">
              <image :src="URL + item.img" />
              <div class="info">
                <p class="tit">{{item.name}}</p>
                <div class="price"><span class="tip">￥</span><span class="money">{{item.price}}</span></div>
                <div class="sell-num">库存{{item.store_nums}}</div>
              </div>
            </navigator>
          </div>
        </scroll-view>
      </div>
    </div>
    <!-- 占位 -->
    <div class="spilter"></div>
    <!-- 甄选精货 -->
    <div class="home-pick" v-if="optionHot.length>0">
      <i class="icon-img-pick"></i>
      <div class="pick-swiper">
        <swiper next-margin="-20rpx" :vertical="true" :circular="true" interval="5000000" duration="400" :autoplay="true">
           <block v-for="(item, index) in optionHot" :key="index">
            <swiper-item>
              <navigator :url="'/site/index/product?id=' + item.id" class="item-pick">
                <h3>
                  <span class="tit">{{item.name}}</span>
                  <span class="price"><span>￥</span>{{item.price1}}.<span>{{item.price2}}</span></span>
                  <div class="pick-more">
                    速抢
                  </div>
                </h3>
                <image :src="URL + item.img" />
              </navigator>
            </swiper-item>
          </block>
        </swiper>
      </div>
    </div>
    <div v-if="floorGoods.length>0" v-for="(item, index) in floorGoods" :key="index">
      <!-- 占位 -->
      <div class="spilter"></div>
      <!-- 楼层 -->
      <div class="home-floor" :class="'floor-' + (index + 1)">
        <h1 class="tit-tip">{{item.cat_name}}</h1>
        <navigator :url="'/site/index/search-list?searchTitle=' + item.cat_name + '&cat=' + item.id" class="floor-banner">
          <image :src="URL + item.ad_img" />
        </navigator>
        <ul class="floor-goods">
          <li class="good-item" v-for="(items, indexs) in item.children" :key="indexs">
            <navigator url="'/site/index/product?id=' + 'items.id'">
              <h2 class="tit">{{items.name}}</h2>
              <p class="des">{{item.cat_name}}</p>
              <div class="bot-part">
                <div class="left">
                  <div class="price">
                    <span class="money-tip">￥</span>
                    <span class="big-num">{{items.price1}}.</span>
                    <span class="small-num">{{items.price2}}</span>
                  </div>
                  <div class="red-btn">立即购买</div>
                </div>
                <div class="right">
                  <image :src="URL + items.img" />
                </div>
              </div>
            </navigator>
          </li>
        </ul>
      </div>
    </div>
    <div class="copy-right">
      Copyright © 2018 忆杭网版权所有
    </div>
  </div>
</template>

<script>
import { getHome } from '@/api/api.js'
import { URL } from '@/api/config.js'
import { homeFloorJsonHandle } from 'common/js/datahandle'

export default {
  data () {
    return {
      URL,
      currentHomeSwiper: 0,
      optionBanner: [],
      newgoodsRows: [],
      optionHot: [],
      floorGoods: []
    }
  },
  onLoad () {
    this.getHome()
  },
  computed: {
  },
  methods: {
    async getHome (type) {
      let _ = this
      if (!type) wx.showLoading({ mask: true }) // 首次进入显示loading
      const { code, data: { homegoodsRows, homecatsRows, homeSlide, finegoodsRows, newgoodsRows } } = await getHome()
      setTimeout(() => {
        if (type) {
          wx.hideNavigationBarLoading() // 下拉刷新
          wx.stopPullDownRefresh()
        } else {
          wx.hideLoading()
        }
      }, 500)
      if (code === 1) {
        _.optionBanner = homeSlide
        _.newgoodsRows = newgoodsRows
        _.floorGoods = homeFloorJsonHandle({ homecatsRows: homecatsRows, homegoodsRows: homegoodsRows })
        _.optionHot = finegoodsRows.map((cur) => {
          cur.price1 = cur.price.split('.')[0]
          cur.price2 = cur.price.split('.')[1]
          return cur
        })
      }
    },
    swiperHomeChange (e) {
      this.currentHomeSwiper = e.target.current
    }
  },
  onPullDownRefresh () {
    wx.showNavigationBarLoading()
    this.getHome(1)
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.home
  background: #f2f2f2
  .spilter
    width: 100%
    height: 10px
    background: #F2F2F2
.home-header
  position: relative
  z-index: 100
  width: 100%
  max-width: 750px; /*no*/
  height: 44px
  background: #266E0A 50% 50%/100% 100% no-repeat
  background-image: url('http://hz.ehanone.com/views/mobile_fun/javascript/main/static/img/topbg@3x.7c86438.png')
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
    height: 165px
    swiper
      height: 165px
      image
        width: 100%
        height: 165px
    .dots
      width: 100%
      height: 8px
      position: absolute
      left: 0
      bottom: 20px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 5px
        width: 8px
        height: 8px
        background: rgba(255, 255, 255, 0.3)
        border-radius: 5px
      .active
        width: 20px
        background: rgba(255, 255, 255, 1)
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
    navigator
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
        &.icon-img-nav5
          bg-image("~common/images/home-nav5")
        &.icon-img-nav4
          bg-image("~common/images/home-nav4")
        &.icon-img-nav3
          bg-image("~common/images/home-nav3")
        &.icon-img-nav2
          bg-image("~common/images/home-nav2")
        &.icon-img-nav1
          bg-image("~common/images/home-nav1")
      span
        font-size: 12px
        color: #666666
.home-hot
  padding: 16px 0 12px
  position: relative
  background: #FFFFFF
  .hot-swiper
    padding: 0 12px
    .scroll-box
      display: flex
  .hot-item
    flex: 1
    margin-left: 12px
    display: block
    width: 102px
    &:first-child
      margin-left: 0
    image
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
    bg-image("~common/images/home-pick")
  .pick-swiper
    margin-left: 10px
    flex: 1
    width: 0
    height: 52px
    display: flex
    border-left: 1px solid #E6E6E6
    padding-left: 10px
    overflow: hidden
    swiper
      width: 100%
      height: 100%
    swiper-item
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
          bg-image("~common/images/more")
      image
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
    image
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
          image
            width: 81.5px
            height: 81.5px
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
