<template>
  <div class="wrapper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in banners" :key="item.link">
        <a :href='item.link'>
          <img :src='item.image' id="swiper-img" @load="imageLoad">
        </a>
      </swiper-slide>

    </swiper>
    <div class="swiper-pagination"></div>
  </div>

</template>

<script>
  // import{Swiper,SwiperItem} from 'common/swiper/index.js'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: "HomeSwpier",
    props:{
      banners: {
        types: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        isLoad:false,
        swiperOption:{
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          pagination: {
          el: '.swiper-pagination',
          clickable:true
        },
      },

    }
    },
    components:{
      swiper,
      swiperSlide
    },
    methods:{
      imageLoad(){
        if(!this.isLoad){
          this.$emit("SwiperImageLoad")
          this.isLoad = true
        }        
      }
    },
  }
</script>
<style>
  #swiper-img{
    width: 100%;
    height: 100%;
  }
  .wrapper{
    position: relative;
  }
  .swiper-pagination{
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
    z-index:1
  }
  .swiper-pagination-bullet{
    margin: 5px;
  }
</style>