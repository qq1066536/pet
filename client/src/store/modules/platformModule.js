import axios from "axios"
export default {
    namespaced: true,
    state: {
        stores: [],
        suppliers: [],
        users: []
    },
    getters: {},
    mutations: {
        setStores(state, stores) {
            state.stores = stores;
        },
        setSuppliers(state, suppliers) {
            state.suppliers = suppliers;
        },
        setUsers(state, users) {
            state.users = users;
        }
    },
    actions: {
        // 查寻所有用户
        setUsers({ commit }) {
            axios({
                method: "get",
                url: "/platform"
            }).then(({ data }) => {
                commit("setUsers", data)
            })
        },
        //查询所有供应商
        setSuppliers({ commit }) {
            axios({
                method: "get",
                url: "/platform/supplier",
                // params: {
                //     page: 1,
                //     rows: 3
                // }
            }).then(({ data }) => {
                console.log("supplier", data)
                commit("setSuppliers", data);
            })
        },
        //查询所有门面信息
        setStores({ commit }) {
            axios({
                method: "get",
                url: "/platform/shop",
                // params: {
                //     page: 1,
                //     rows: 3
                // }
            }).then(({ data }) => {
                console.log("data", data)
                commit("setStores", data);
            })
        }
    }
}