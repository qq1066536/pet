import axios from "axios"
export default {
    namespaced: true,
    state: {
        stores: [],
        suppliers: [],
        storesAndsuppliers: []
    },
    getters: {},
    mutations: {
        setStores(state, stores) {
            state.stores = stores;
        },
        setSuppliers(state, suppliers) {
            state.suppliers = suppliers;
        },
        setStoresAndSuppliers(state, storesAndsuppliers) {
            state.storesAndsuppliers = storesAndsuppliers;
        }
    },
    actions: {
        // 查询所有门店和供应商的集合
        setStoresAndSuppliers({ commit }) {
            axios({
                method: "get",
                url: "/platform/findAll"
            }).then(({ data }) => {
                console.log("storesAndsuppliers", data)
                commit("setStoresAndSuppliers", data)
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