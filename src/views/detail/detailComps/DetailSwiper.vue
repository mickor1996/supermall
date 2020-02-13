<template>
  <div class="detail-swiper">
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide v-for="item in topImages" :key="item" >
          <img :src='item'>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name:'DetailSwiper',
    components:{
      swiper,
      swiperSlide
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
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
        }
      }
    }
  }
</script>
<style scoped>
  .detail-swiper{
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
  .swiper{
    height: 300px;
    overflow: hidden;
  }
  img{
    width:100%
  }
</style>