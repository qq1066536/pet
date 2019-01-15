
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
        userId:"",
        trueTime: "",
        orders: []
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
            // console.log(shopId)
            state.shopId = shopId;
        },
        setUserId(state, userId) {
            state.userId = userId;
        },
        setTrueTime(state, trueTime) {
            state.trueTime = trueTime
        },
        setOrders(state, orders) {
            state.orders = orders
        },
    },

    actions: {
        getSession({ commit,dispatch }) {
            axios({
                method: "get",
                url: "/users/getSession"
            }).then(({ data }) => {
                commit("setUserId", data._id);
                // console.log("user", data)
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
                    dispatch("setProducts")
                    // console.log("shopId", data[0]._id)
                })
            });
        },
        setProduct({ commit }, shopId) {
            axios({
                method: "get",
                url: "/sopPropducts/" + shopId
            }).then(({ data }) => {
                // console.log(data)
                commit("setProduct", data);
            })
        },
        setProducts({ commit, state}, payloda = { page: 1, rows: 5 }) {
            let id = state.shopId || JSON.parse(window.localStorage.getItem("shopId"));
            axios({
                method: "get",
                url: "/sopPropducts",
                params: { shopId: id, ...payloda }
            }).then(({ data }) => {
                // console.log(state.id)
                // console.log(state.shopId)
                // console.log(data)
                // dispatch("setSupProducts")
                commit("setProducts", data.rows);
                commit("setPagition", data)
            });
        },
        setSupProducts({ commit,dispatch}, payloda = { page: 1, rows: 5 }) {
            axios({
                method: "get",
                url: "/sopPropducts/productsAll",
                params: { ...payloda }
            }).then(({ data }) => {
                // console.log(state.supId)
                // console.log(data)
                commit("setSupProducts", data.rows);
                dispatch("setProducts")
                commit("setPagition", data)
            });
        },
        getTime({ commit }) {
            var nowtime = new Date();
            var year = nowtime.getFullYear();
            // var month = (nowtime.getMonth() + 1).toString().replace(/^[0-9]{1}$/,"0"+(nowtime.getMonth() + 1));
            var month = (nowtime.getMonth() + 1).toString().replace(/^[0-9]{1}$/, nowtime.getMonth() + 1);
            var day = (nowtime.getDate()).toString().replace(/^[0-9]{1}$/, nowtime.getDate());
            commit("setTrueTime", year + '/' + month + '/' + day);
        },
        //获取所有订单
        // getOrders({ commit, state }) {
        //     console.log('商店id',state.shopId)
        //     axios({
        //         method: "get",
        //         url: "/salePro",
        //         params: {
        //             trueTime: state.trueTime,
        //             sessionId:window.localStorage.getItem("session._id"),
        //         }
        //     }).then(({ data }) => {
        //         commit("setOrders",data)
        //         console.log("订单",data)
        //         console.log(state.trueTime, state.shopId)
        //     })
        // }
    }
}