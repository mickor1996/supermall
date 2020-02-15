<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list />
    <bottom-bar />
  </div>
</template>
<script>
  import NavBar from 'common/navbar/NavBar.vue'
  import CartList from './childComps/CartList.vue'
  import BottomBar from './childComps/BottomBar.vue'
  export default {
    name:'Cart',
    components:{
      NavBar,
      CartList,
      BottomBar
    },
    computed:{
      cartLength(){
        return this.$store.getters.cartLength
      }
    }
  }
</script>
<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>