
import axios from "axios"
export default {
    namespaced: true,
    state: {
        product: {},
        products: [],
        supProducts: [],
        pagination: {},
        updateVisible: false,
        search: {
            type: "",
            value: ""
        },
        shopId: ""
    },
    getters: {},
    mutations: {
        setProduct(state, product) {
            state.product = product;
        },
        setSupProducts(state, supProducts) {
            state.supProducts = supProducts;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setPagition(state, pagination) {
            state.pagination = pagination
        },
        setSearch(state, search) {
            state.search = search
        },
        setupdateVisible(state, updateVisible) {
            state.updateVisible = updateVisible
        },
        setShopId(state, shopId) {
            console.log(shopId)
            state.shopId = shopId;
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
                    window.localStorage.setItem("shopId",JSON.stringify(data[0]._id))
                    // commit("setShop", data[0]);
                    // console.log("shop", data)
                    console.log("shopId", data[0]._id)
                })
            });
        },
        setProduct({ commit }, shopId) {
            axios({
                method: "get",
                url: "/sopPropducts/" + shopId
            }).then(({ data }) => {
                console.log(data)
                commit("setProduct", data);
            })
        },
        setProducts({ commit, state }, payloda = { page: 1, rows: 5 }) {
            let id = state.shopId || JSON.parse(window.localStorage.getItem("shopId"));
            axios({
                method: "get",
                url: "/sopPropducts",
                params: { shopId: id, ...payloda }
            }).then(({ data }) => {
                // console.log(state.id)
                console.log(state.shopId)
                console.log(data)
                commit("setProducts", data.rows);
                commit("setPagition", data)
            });
        },
        setSupProducts({ commit, state ,dispatch}, payloda = { page: 1, rows: 5 }) {
            axios({
                method: "get",
                url: "/sopPropducts/productsAll",
                params: { ...payloda }
            }).then(({ data }) => {
                // console.log(state.supId)
                console.log(data)
                commit("setSupProducts", data.rows);
                dispatch("setProducts")
                commit("setPagition", data)
            });
        },
    }
}