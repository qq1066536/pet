
import Vue from 'vue'
import Vuex from 'vuex'
import orderModules from "./modules/orderModules"
import platformModule from "./modules/platformModule.js"
import serviceModules from "./modules/serviceModules"

import SupProducts from "./modules/supplierModules"
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        orderModules,
        platformModule,
        serviceModules,
        SupProducts
    },
    state: {
    },
    mutations: {}
})