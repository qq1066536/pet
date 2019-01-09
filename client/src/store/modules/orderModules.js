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
    },
    mutations: {
        getOrders: function (state, data) {
            state.data = data;
        },
        setOrderInfo: function (state, data) {
            state.updateInfo = data;
        },
        /* 
        setSearch:function(state,search){
            state.search = search
        },*/
        setUpdateVisible: function (state, bool) {
            state.dialogVisible = bool;
        },
        setPagination: function (state, data) {
            state.pagination = data;
        }, 
    },
    actions: {
        getOrders: function ({ commit },payload={page:1,row:5}) {
            let id = "5c32f1d56c9da2c6832b828f";
            axios({
                methods: "get",
                url: "/orders/shop",
                params: {id,...payload}
            }).then(({ data }) => {
                // console.log(data)
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