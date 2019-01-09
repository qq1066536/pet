import Vue from 'vue'
import Vuex from 'vuex'
import orderModules from "./modules/orderModules"
import SupProducts from "./modules/supplierModules"
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        orderModules,
        SupProducts
    },
    state: {
    },
    mutations: {
    }
})