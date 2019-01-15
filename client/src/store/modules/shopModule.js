
import axios from "axios"
export default {
    namespaced: true,
    state: {
        shop: {},
        userId: "",
        shopId:""
    },
    getters: {},
    mutations: {
        setShop(state, shop) {
            state.shop = shop;
        },
        setUserId(state, userId) {
            state.userId = userId
            // console.log(userId)
        },
        setShopId(state,shopId){
            state.shopId = shopId
        }
    },
    actions: {
        getSession({ commit}) {
            axios({
                method: "get",
                url: "/users/getSession"
            }).then(({ data }) => {
                commit("setUserId", data._id);
                // console.log("user", data)
                axios({
                    method: "get",
                    url: "/shop",
                    params:{
                        userId:data._id
                    }
                }).then(({ data }) => {              
                    commit("setShopId", data[0]._id);
                    window.localStorage.setItem("shopId",JSON.stringify(data[0]._id))
                    commit("setShop", data[0]);
                    // console.log("shop", data)
                })
            });
        },
        // setUserId({ commit, rootState }) {
        //     let id = rootState.session._id || JSON.parse(window.localStorage.getItem("session"))._id;
        //     commit('setUserId', id)
        //     console.log(id)
        // },
        // setShop({ commit }) {
        //     axios({
        //         method: "get",
        //         url: "/shop/" + id
        //     }).then(({ data }) => {
        //         commit("setShop", data);
        //         // commit('setUserId', data._id)
        //     })
        // },
    }
}