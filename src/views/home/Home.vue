<template>
  <div id='home'>
    <nav-bar class="home-nav"><div slot='center'>购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
    @tabClick="tabClick"
    ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class='content' 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll" 
    :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners='banners' @SwiperImageLoad="SwiperImageLoad"></home-swiper>
      <recommend-view :recommends='recommends'></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods" ></goods-list>
    </scroll>
   <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'common/navbar/NavBar'
  import Scroll from 'common/scroll/Scroll'
  import {debounse} from 'common/utils.js'
  import TabControl from 'content/tabControl/TabControl.vue'
  import GoodsList from 'content/goods/GoodsList.vue'
  import BackTop from 'content/backTop/BackTop.vue'

  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import {getHomeMultidata,getHomeGoods} from 'network/home.js'

  export default {
    name:'Home',
    components:{
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType]
      }
    },
    methods:{
      
      //事件监听
      tabClick(index){
        switch(index){
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break  
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        // console.log(position)
        this.isShowBackTop=(-position.y)>1000

        this.isTabFixed = (-position.y)>this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      SwiperImageLoad(){      
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.$refs.tabControl.$el.offsetTop)
      },
      //网络请求
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          console.log(res)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
        }).catch(err=>console.log(err))
        this.$refs.scroll && this.$refs.scroll.finishPullUp()
      }
    },
    created(){
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted(){  
      const refresh = debounse(this.$refs.scroll.refresh)
      this.$bus.$on("itemImageLoad",()=>{
        refresh()
      })

    }

  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color:#fff;

    /* position:fixed;
    left: 0;
    right: 0;
    top:0;
    z-index:9; */
  }
  .tab-control{
    /* position: sticky; */
    position: relative;
    z-index: 9;
    /* top:44px; */
  }
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
  .content{
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom:49px;
    left:0;
    right:0;
  }

</style>