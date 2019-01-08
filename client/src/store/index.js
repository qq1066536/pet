import Vue from 'vue'
import Vuex from 'vuex'
import orderModules from "./modules/orderModules"
import productsMoudles from "./modules/productsMoudles"
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        orderModules,
        productsMoudles
    },
    state: {
    },
    mutations: {
    }
})