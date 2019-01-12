
import axios from "axios"
export default {
    namespaced: true,
    state: {
        shop:{},
        shopId:""
    },
    getters: {},
    mutations: {
        setShop(state, shop) {
            state.shop = shop;
        },
    },
    actions: {
        setShop({ commit,rootState }) {
        let id = rootState.session._id||JSON.parse(window.localStorage.getItem("session"))._id;
        commit('setShopId', id)
            axios({
                method: "get",
                url: "/shop/" + id
            }).then(({ data }) => {
                console.log("门店",data)
                commit("setShop", data);
            })
        },
    }
}