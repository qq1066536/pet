
import axios from "axios"
export default {
    namespaced: true,
    state: {
        shopId: "",
        trueTime:""
    },
    getters: {},
    mutations: {
        setShopId(state, shopId) {
            state.shopId = shopId
        },
        setTrueTime(state, trueTime) {
            state.trueTime = trueTime
        },
    },
    actions: {
        getSession({ commit, state }) {
            axios({
                method: "get",
                url: "/users/getSession"
            }).then(({ data }) => {
                // commit("setUserId", data._id);
                console.log("user", data)
                axios({
                    method: "get",
                    url: "/shop",
                    params: {
                        userId: data._id
                    }
                }).then(({ data }) => {
                    commit("setShopId", data[0]._id);
                    window.localStorage.setItem("shopId", JSON.stringify(data[0]._id))
                    commit("setShop", data[0]);
                    console.log("shop", data)
                })
            });
        },
        getTime({ commit }) {
            var nowtime = new Date();
            var year = nowtime.getFullYear();
            // var month = (nowtime.getMonth() + 1).toString().replace(/^[0-9]{1}$/,"0"+(nowtime.getMonth() + 1));
            var month = (nowtime.getMonth() + 1).toString().replace(/^[0-9]{1}$/, nowtime.getMonth() + 1);
            var day = (nowtime.getDate()).toString().replace(/^[0-9]{1}$/, nowtime.getDate());
            commit("setTrueTime", year + '/' + month + '/' + day);
        },
    }
}