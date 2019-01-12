
import axios from "axios"
export default {
    namespaced: true,
    state: {
        shop:{},
        usreId:"",
        id:""
    },
    getters: {},
    mutations: {
        setShop(state, shop) {
            state.shop = shop;
        },
        setUserId(state,usreId){
            state.usreId=usreId
        },
        set
    },
    actions: {
        setShop({ commit,rootState }) {
        let id = rootState.session._id||JSON.parse(window.localStorage.getItem("session"))._id;
        commit('setUserId', id)
            axios({
                method: "get",
                url: "/shop/" + id
            }).then(({ data }) => {
                commit("setShop", data);
                // commit('setUserId', data._id)
            })
        },
    }
}