import Vue from 'vue'
import Vuex from 'vuex'
import orderModules from "./modules/orderModules"
import platformModule from "./modules/platformModule.js"
import serviceModules from "./modules/serviceModules"
import SupProducts from "./modules/supplierModules"
import axios from "axios"
import productsMoudles from "./modules/productsMoudles"
import shopModule from "./modules/shopModule"
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        orderModules,
        serviceModules,
        SupProducts,
        platformModule
    },
    state: {
        session:{}
    },
    mutations: {
        getsession:function(state,data){
            state.session=data
        }
    },
    actions:{
        getSession:function({commit}) {
            axios({
              method: "get",
              url: "/users/getSession"
            }).then(({ data }) => {
                commit("getsession",data)
                window.localStorage.setItem("session",JSON.stringify(data))
            });
          }
    }
})