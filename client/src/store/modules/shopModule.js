
import axios from "axios"
export default {
    namespaced: true,
    state: {
        shop:{},
        id: "5c344af38c93229ccce96a68"
    },
    getters: {},
    mutations: {
        setShop(state, shop) {
            state.shop = shop;
        },
    },
    actions: {
        setShop({ commit }, id) {
            axios({
                method: "get",
                url: "/shop/" + id
            }).then(({ data }) => {
                console.log(data)
                commit("setShop", data);
            })
        },
    }
}