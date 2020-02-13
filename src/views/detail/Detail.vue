<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>
<script>
  import DetailNavBar from './detailComps/DetailNavBar.vue'
  import DetailSwiper from './detailComps/DetailSwiper.vue'
  import DetailBaseInfo from './detailComps/DetailBaseInfo.vue'
  import {getDetail,Goods} from 'network/detail.js'
  export default {
    name:'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    },
    data(){
      return {
        iid:null,
        topImages:[],
        goods:null
      }
    },
    created(){
      // console.log(this.$route.params)
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res=>{
        console.log(res)
        const data = res.result
        this.topImages = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      })
    }
  }
</script>
<style>
    .swiper-pagination-bullet{
    margin: 5px;
  }
</style>