
import axios from "axios"
export default {
    namespaced: true,
    state: {
        product: {},
        products: [],
        pagination: {},
        updateVisible: false,
        search: {
            type: "",
            value: ""
        }
    },
    getters: {},
    mutations: {
        setProduct(state, product) {
            state.product = product;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setPagition(state, pagination) {
            state.pagination = pagination
        },
        setupdateVisible(state, updateVisible) {
            state.updateVisible = updateVisible
        }
    },
    actions: {
        setProduct({ commit }, id) {
            axios({
                method: "get",
                url: "/sopPropducts/" + id
            }).then(({ data }) => {
                commit("setProduct", data);
            })
        },
        setProducts({ commit}, payloda = { page: 1, rows: 5}) {
            axios({
                method: "get",
                url: "/sopPropducts",
                params: { ...payloda }
            }).then(({ data }) => {
                commit("setProducts", data.rows);
                commit("setPagition", data)
            });
        },
    }
}