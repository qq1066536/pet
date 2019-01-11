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
        shopId: "5c32f1d56c9da2c6832b828f"
    },
    mutations: {
        getServices: function (state, data) {
            state.data = data;
        },
        setServiceInfo: function (state, data) {
            state.updateInfo = data;
        },
        setSearch:function(state,search){
            state.search = search
        },
        setUpdateVisible: function (state, bool) {
            state.dialogVisible = bool;
        },
        setPagination: function (state, data) {
            state.pagination = data;
        }, 
    },
    actions: {
        getServices: function ({ commit },payload={page:1,rows:5}) {
            let id = "5c32f1d56c9da2c6832b828f";
            axios({
                methods: "get",
                url: "/services/shop",
                params: {id,...payload}
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