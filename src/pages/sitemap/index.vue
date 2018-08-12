<template>
  <div class="sitemap child-view">

  </div>
</template>

<script>
// import { getProSitemap } from '@/api/api.js'
// import { sitemapJsonHandle } from 'common/js/datahandle'
import HeaderPub from 'base/header/header-pub'
import { URL } from '@/api/config'

export default {
  data () {
    return {
      URL
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
  padding-top: 42px
  padding-bottom: 50px
  background: #ECF0F3
  .left-class
    width: 94px
    height: 100%
    overflow: hidden
    -webkit-overflow-scrolling: touch
    background: #FFF
    .scroll-box
      position: relative
      width: 124px
      height: 100%
      overflow-x: hidden
      overflow-y: scroll
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
      -webkit-overflow-scrolling: auto
      position: relative
      width: calc(100% + 30px)
      padding-right: 30px
      height: 100%
      overflow-x: hidden
      overflow-y: scroll
      &.scroll
        -webkit-overflow-scrolling: touch
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
          &:nth-of-type(3n)
            margin-right: 0
          img
            display: block
            width: 100%
            height: 77.09px
            padding: 6px
          span
            display: block
            no-wrap()
</style>
