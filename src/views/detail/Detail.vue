<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>
<script>
  import DetailNavBar from './detailComps/DetailNavBar.vue'
  import DetailSwiper from './detailComps/DetailSwiper.vue'
  import DetailBaseInfo from './detailComps/DetailBaseInfo.vue'
  import DetailShopInfo from './detailComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './detailComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './detailComps/DetailParamInfo.vue'
  import DetailCommentInfo from './detailComps/DetailCommentInfo.vue'
  import DetailBottomBar from './detailComps/DetailBottomBar.vue'
  import GoodsList from 'content/goods/GoodsList.vue'
  import BackTop from 'content/backTop/BackTop.vue'
  import Scroll from 'common/scroll/Scroll'

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail.js'

  import {debounse} from '@/common/utils.js'
  import {itemListenerMixin} from '@/common/mixin.js'
  export default {
    name:'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      BackTop,
      Scroll
    },
    mixins:[itemListenerMixin],
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommend:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        isShowBackTop:false,
      }
    },
    created(){
      // console.log(this.$route.params)
      this.iid = this.$route.params.iid
      // 请求详情数据
      getDetail(this.iid).then(res=>{
        // console.log(res)
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 获取商店信息
        this.shop = new Shop(data.shopInfo)
        // 商品详情
        this.detailInfo = data.detailInfo
        // 参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // 评论信息
        if(data.rate.cRate!=0){
          this.commentInfo = data.rate.list[0]
        }
      })
      // 请求推荐数据
      getRecommend().then(res=>{
        // console.log(res)
        this.recommend = res.data.list
      })
      this.getThemeTopY = debounse(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
        // console.log(this.themeTopYs)
      },100)
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()

      },
      titleClick(index){
        console.log(index)
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){

        let positionY = -position.y
        let length=this.themeTopYs.length
        for(let i =1;i < length;i++){
          if(this.currentIndex !=i&&((i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||(i==length-1&&positionY>=this.themeTopYs[i]))){
            this.currentIndex = i
            // console.log(this.currentIndex)
            this.$refs.nav.currentIndex=this.currentIndex
          }
        }
        // 显示回到顶部
        this.isShowBackTop=positionY>1000   
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      addToCart(){
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.nowPrice
        product.iid = this.iid
        this.$store.dispatch('addCart',product)
      }
    },
    mounted(){

    },
    destroyed(){
      this.$bus.$off("itemImageLoad",this.itemImgListener)
    }
  }
</script>
<style scoped>
  .swiper-pagination-bullet{
    margin: 5px;
  }
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px - 49px);
  }
</style>