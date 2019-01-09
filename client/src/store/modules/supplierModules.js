import axios from "axios"
export default {
    // strict: true,
    namespaced: true,
    state: {
        dialogVisible: {visible:false},
        products: [],
        product: [],
        id: "5c32ef8a6c9da2c6832b81fe",
        pid: "",
        pagination: {}
    },
    mutations: {
        setDialogVisible(state, data) {
            state.dialogVisible.visible = data
        },
        setId(state, data) {
            state.id = data
        },
        setProducts(state, data) {
            state.products = data
        },
        setPagination: function (state, data) {
            state.pagination = data;
        },
        getProduct: function (state, data) {
            state.product = data
        },
        getPid: function (state, data) {
            state.pid = data
        }
    },
    actions: {
        setProducts: function ({ commit, state }, payload = { page: 1, row: 5 }) {
            let id = state.id
            axios({
                methods: "get",
                url: "/supplier",
                params: { id, ...payload }
            }).then(({ data }) => {
                commit('setPagination', data)
                data = data.rows
                for (let i = 0; i < data.length; i++) {
                    for (let key in data[i]) {
                        if (Array.isArray(data[i][key])) {
                            data[i][key] = data[i][key].join(",")
                        }
                    }
                }
                commit('setProducts', data)
            })
        },
        getProduct: function ({ commit, state }) {
            let id = state.id
            let proid = state.pid
            // console.log("getProduct",proid)
            axios({
                method: "get",
                url: `/supplier/${proid}`,
                params: { id }
            }).then(({ data }) => {
                // console.log(data)
                commit('getProduct', data)
            })
        }
    }
}