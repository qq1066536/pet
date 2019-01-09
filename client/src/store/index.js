import Vue from 'vue'
import Vuex from 'vuex'
import orderModules from "./modules/orderModules"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        orderModules,
    },
    state: {
    },
    mutations: {
    }
})