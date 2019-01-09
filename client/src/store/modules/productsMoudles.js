
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
        },
        id: "5c32f1d56c9da2c6832b828f"
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
                console.log(data)
                commit("setProduct", data);
            })
        },
        setProducts({ commit, state }, payloda = { page: 1, rows: 5 }) {
            axios({
                method: "get",
                url: "/sopPropducts",
                params: { id: state.id, ...payloda }
            }).then(({ data }) => {
                console.log(state.id)
                console.log(data)
                commit("setProducts", data.rows);
                commit("setPagition", data)
            });
        },
    }
}