<template>
  <div class="sitemap child-view">
    <div class="left-class">
      <scroll-view scroll-y class="scroll-box" v-if="sitemapJson.length>0">
        <ul>
          <li v-for="(item, index) in sitemapJson" @click.stop="goScroll(index)" :class="{'on': curIndex === index}" :key="index">{{item.name}}</li>
        </ul>
      </scroll-view>
    </div>
    <div class="right-class">
      <scroll-view @scroll="scrollToAct" :scroll-with-animation="true" :scroll-into-view="toIndex" scroll-y class="scroll-box" v-if="sitemapJson.length>0">
        <dl :id="'go-' + index" class="sitemap-son" v-for="(item, index) in sitemapJson" :key="index">
          <dt>
            {{item.name}}
          </dt>
          <dd v-for="(itemson, indexson) in item.children" :key="indexson">
            <navigator :url="'/site/index/search-list?searchTitle=' + itemson.name + '&cat=' + itemson.id">
              <image v-if="itemson.img" :src="URL + itemson.img" />
              <span>{{itemson.name}}</span>
            </navigator>
          </dd>
        </dl>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { getProSitemap } from '@/api/api.js'
import { sitemapJsonHandle } from 'common/js/datahandle'
import HeaderPub from 'base/header/header-pub'
import { URL } from '@/api/config'

export default {
  data () {
    return {
      URL,
      sitemapJson: [],
      toIndex: 'go-0' // 默认位置0
    }
  },
  onLoad () {
    this.getProSitemap() // 获取数据
  },
  methods: {
    async getProSitemap () {
      const { code, data } = await getProSitemap()
      if (code !== 1) return
      this.sitemapJson = sitemapJsonHandle(data)
      setTimeout(() => {
        let query = wx.createSelectorQuery()
        query.selectAll('.sitemap-son').boundingClientRect()
        query.exec(function (res) {
          console.log(res)
        })
      }, 2000)
    },
    goScroll (index) {
      this.toIndex = 'go-' + index
    },
    scrollToAct (e) {
      console.log(e)
    }
  },
  components: {
    HeaderPub
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.sitemap
  widdth: 100%
  height: 100%
  display: flex
  background: #ECF0F3
  .left-class
    width: 94px
    height: 100%
    overflow: hidden
    background: #FFF
    position: relative
    .scroll-box
      height: 100%
      width: 130px // 隐藏滚动条操作
    ul
      width: 94px
      li
        font-size: 12px
        height: 50px
        text-align: center
        display: flex
        justify-content: center
        align-items: center
        position: relative
        color: #666666
        &:after
          line-scale()
        &.on
          background: #ECF0F3
          color: #333
  .right-class
    flex: 1
    width: 0
    height: 100%
    overflow: hidden
    .scroll-box
      height: 100% // 隐藏滚动条操作
      .sitemap-son
        padding: 12px
        overflow: hidden
        dt
          background: #FFFFFF
          height: 30px
          line-height: 30px
          text-align: center
          font-size: 14px
          color: #666666
          border-radius: 3px
        dd
          width: 30%
          float: left
          text-align: center
          line-height: 24px
          margin-right: 5%
          margin-top: 5%
          background: #FFFFFF
          border-radius: 1px
          &:nth-of-type(3n + 1) // 坑点 样式nth 注意使用
            margin-right: 0
          image
            display: block
            width: 100%
            height: 77.09px
            padding: 6px
          span
            display: block
            no-wrap()
</style>
