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
        shopId: "",
    },
    mutations: {
        getServices: function (state, data) {
            state.data = data;
        },
        setServiceInfo: function (state, data) {
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
        setShopId: function(state,id) {
            state.shopId = id;
        }
    },
    actions: {
        getServices: function ({ commit,rootState }, payload = { page: 1, rows: 5 }) {
            let id = rootState.session._id || JSON.parse(window.localStorage.getItem("session"))._id;
            commit('setShopId', id)
            axios({
                methods: "get",
                url: "/services/shop",
                params: { id, ...payload }
            }).then(({ data }) => {
                // console.log(data)
                commit('getServices', data.rows)
                commit('setPagination', data)
            })
        },
        setServiceInfo: function ({ commit }, id) {
            axios({
                method: "get",
                url: "/services/" + id,
            }).then(({ data }) => {
                commit('setServiceInfo', data)
            })
        }
    }
}