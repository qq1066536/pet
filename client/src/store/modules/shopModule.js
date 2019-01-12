
import axios from "axios"
export default {
    namespaced: true,
    state: {
        shop: {},
        userId: "",
        id: ""
    },
    getters: {},
    mutations: {
        setShop(state, shop) {
            state.shop = shop;
        },
        setUserId(state, id) {
            state.userId = id
            console.log(id)
        },

    },
    actions: {
        setUserId({ commit, rootState }) {
            let id = rootState.session._id || JSON.parse(window.localStorage.getItem("session"))._id;
            commit('setUserId', id)
            console.log(id)
        },
        setShop({ commit }) {
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