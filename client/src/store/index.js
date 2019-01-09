import Vue from 'vue'
import Vuex from 'vuex'
import orderModules from "./modules/orderModules"
import serviceModules from "./modules/serviceModules"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        orderModules,
        serviceModules,
    },
    state: {
    },
    mutations: {
    }
})