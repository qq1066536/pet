
import Vue from 'vue'
import Vuex from 'vuex'
import orderModules from "./modules/orderModules"
import platformModule from "./modules/platformModule.js"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        orderModules,
        platformModule
    },
    state: {
    },
    mutations: {}
})