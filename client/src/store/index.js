import Vue from 'vue'
import Vuex from 'vuex'
import orderModules from "./modules/orderModules"
import productsMoudles from "./modules/productsMoudles"
import SupProducts from "./modules/supplierModules"
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        orderModules,
        productsMoudles,
        SupProducts
    },
    state: {
    },
    mutations: {
    }
})