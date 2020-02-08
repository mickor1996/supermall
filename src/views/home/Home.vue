<template>
  <div id='home'>
    <nav-bar class="home-nav"><div slot='center'>购物街</div></nav-bar>
    <scroll class='content'>
      <home-swiper :banners='banners'></home-swiper>
      <recommend-view :recommends='recommends'></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" 
      @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods" ></goods-list>
    </scroll>
   
  </div>
</template>

<script>
  import NavBar from 'common/navbar/NavBar'
  import Scroll from 'common/scroll/Scroll'
  import TabControl from 'content/tabControl/TabControl.vue'
  import GoodsList from 'content/goods/GoodsList.vue'

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
        currentType:'pop'
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
      }
    },
    created(){
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color:#fff;

    position:fixed;
    left: 0;
    right: 0;
    top:0;
    z-index:9;
  }
  .tab-control{
    position: sticky;
    top:44px;
    z-index: 9;
  }
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
  .content{
    position: absolute;
    top:44px;
    bottom:49px;
    left:0;
    right:0;
  }
</style>