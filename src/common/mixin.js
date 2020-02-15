import {debounse} from '@/common/utils.js'
export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null
    }
  },
  mounted(){
    const refresh = debounse(this.$refs.scroll.refresh)
    this.itemImgListener = ()=>{
      refresh()
    }
    this.$bus.$on("itemImageLoad",this.itemImgListener)
  }
}