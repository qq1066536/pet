import Vue from 'vue'
import Vuex from 'vuex'
import orderModules from "./modules/orderModules"
import productsMoudles from "./modules/productsMoudles"
import SupProducts from "./modules/supplierModules"
import shopModule from "./modules/shopModule"
import { stat } from 'fs';
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        orderModules,
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
    }
})