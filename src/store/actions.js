export default {
  addCart(context,payload){
    let oldProduct = null

    for(let item of context.state.cartList){
      if(payload.iid == item.iid){
        oldProduct = item
      }
    }
    if(oldProduct){
      context.commit('addCounter',oldProduct)
    }else{
      context.commit('addToCart',payload)
    }
  }
}