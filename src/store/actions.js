import {getCart} from 'network/category'

const actions = {
    updateCart(context) {
        getCart().then( res => {
            context.commit('addCart',{count:res.data.length || 0})
        })
    },
}

export default actions