
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
        shopId: "",
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
        }
    },
    setShopId: function (state, id) {
        state.shopId = id;
    },
    actions: {

        setProduct({ commit }, id) {
            axios({
                method: "get",
                url: "/sopPropducts/" + id
            }).then(({ data }) => {
                console.log(data)
                commit("setProduct", data);
            })
        },
        setProducts({ commit,rootState }, payloda = { page: 1, rows: 5 }) {
            let id = rootState.session._id || JSON.parse(window.localStorage.getItem("session"))._id;
            axios({
                method: "get",
                url: "/sopPropducts",
                params: { id, ...payloda }
            }).then(({ data }) => {
                // console.log(state.id)
                console.log(data)
                commit("setProducts", data.rows);
                commit("setPagition", data)
                commit('setShopId', data._id)
            });
        },
        setSupProducts({ commit, state }, payloda = { page: 1, rows: 5 }) {
            axios({
                method: "get",
                url: "/sopPropducts/productsAll",
                params: { ...payloda }
            }).then(({ data }) => {
                // console.log(state.supId)
                console.log(data)
                commit("setSupProducts", data.rows);
                commit("setPagition", data)
            });
        },
    }
}