import Vue from "vue"
import Vuex from "vuex"
import platformModule from "./modules/platformModule.js"
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        platformModule
    },
    state: {
    },
    getters: {},
    mutations: {
    },
    actions: {
    }
})