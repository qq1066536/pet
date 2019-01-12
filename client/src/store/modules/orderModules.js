import axios from "axios"
export default {
    // strict: true,
    namespaced: true,
    state: {
        data: [],
        pagination: {},
        updateInfo: {},
        dialogVisible: false,
        search: {
            type: "",
            value: "",
        },
        id: "",
    },
    mutations: {
        getOrders: function (state, data) {
            state.data = data;
        },
        setOrderInfo: function (state, data) {
            state.updateInfo = data;
        },

        setSearch: function (state, search) {
            state.search = search
        },
        setUpdateVisible: function (state, bool) {
            state.dialogVisible = bool;
        },
        setPagination: function (state, data) {
            state.pagination = data;
        },
        setId: function (state, data) {
            state.id = data;
        },
    },
    actions: {
        getOrders: async function ({ state, commit, rootState }, payload = { page: 1, rows: 5 }) {
            // console.log(rootState,rootState.session)
            let shopId = rootState.session._id || JSON.parse(window.localStorage.getItem("session"))._id;
            await axios({
                method: "get",
                url: "/orders/shopid",
                params: { id: shopId },
            }).then(({ data }) => {
                // console.log(data);
                commit("setId",data._id)
            })
            // console.log(id)
            axios({
                method: "get",
                url: "/orders/shop",
                params: { id: state.id, ...payload }
            }).then(({ data }) => {
                // console.log("123",data)
                commit('getOrders', data.rows)
                commit('setPagination', data)
            })
        },
        setOrderInfo: function ({ commit }, id) {
            axios({
                method: "get",
                url: "/orders/" + id,
            }).then(({ data }) => {
                commit('setOrderInfo', data)
            })
        }
    }
}