import Vue from 'vue'
import Vuex from 'vuex'
import orderModules from "./modules/orderModules"
<<<<<<< HEAD
import platformModule from "./modules/platformModule.js"
import serviceModules from "./modules/serviceModules"
import SupProducts from "./modules/supplierModules"
import axios from "axios"
=======
import productsMoudles from "./modules/productsMoudles"
import SupProducts from "./modules/supplierModules"
import shopModule from "./modules/shopModule"
import { stat } from 'fs';
>>>>>>> 4eba77c5cb374e9440fc54ce3731000d1e5e4754
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        orderModules,
<<<<<<< HEAD
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
    },
    mounted(){
        console.log()
=======
        productsMoudles,
        SupProducts,
        shopModule
    },
    state: {
        dialogImageUrls:[{
            url:"1.png"
        }],
        dialogVisible:{
            visible:false
        },
        dialogImageUrl:""
    },
    mutations: {
        adddialogImageUrls:function(state,data){
            state.dialogImageUrls.push({url:data})
        },
        setUrl:function(state,data){
            state.dialogImageUrl={url:data}
        },
        removedialogImageUrls:function(state,data){
            state.dialogImageUrls.splice(state.dialogImageUrls.indexOf({url:data}),1)
        },
        setVisible:function(state,data){
            state.dialogVisible.visible=data
        }
>>>>>>> 4eba77c5cb374e9440fc54ce3731000d1e5e4754
    }
})