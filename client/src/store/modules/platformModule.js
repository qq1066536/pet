import axios from "axios"
export default {
    namespaced: true,
    state: {
        stores: [],
        store: {},
        users: [],
        user: {},
        pagination: {},
        shopPagination: {},
        search: {
            type: "",
            value: "",
        },
        shopSearch: {
            type: "",
            value: "",
        },
        updateShopVisible: false,
        petmasters: [],
        petmasterPagination: {},
        petmasterSearch: {
            type: "",
            value: ""
        }
    },
    getters: {},
    mutations: {
        setStores(state, stores) {
            state.stores = stores;
        },
        setStore(state, store) {
            state.store = store;
        },
        setUsers(state, users) {
            state.users = users;
        },
        setUser(state, user) {
            state.user = user;
        },
        setPagination(state, pagination) {
            state.pagination = pagination;
        },
        setShopPagination(state, shopPagination) {
            state.shopPagination = shopPagination;
        },
        setSearch(state, search) {
            state.search = search;
        },
        setShopSearch(state, shopSearch) {
            state.shopSearch = shopSearch;
        },
        setUpdateShopVisible(state, updateShopVisible) {
            state.updateShopVisible = updateShopVisible;
        },
        setPetmasters(state, petmasters) {
            state.petmasters = petmasters;
        },
        setPetmasterPagination(state, petmasterPagination) {
            state.petmasterPagination = petmasterPagination;
        },
        setPetmasterSearch(state, petmasterSearch) {
            state.petmasterSearch = petmasterSearch;
        }
    },
    actions: {
        // 查寻所有用户
        setUsers({ commit }, payLoad = { page: 1, rows: 5 }) {
            axios({
                method: "get",
                url: "/platform",
                params: payLoad
            }).then(({ data }) => {
                commit("setUsers", data.rows)
                commit("setPagination", data)
            })
        },
        //通过id查询用户
        setUser({ commit }, id) {
            axios({
                method: "get",
                url: "/platform/findUser/" + id
            }).then(({ data }) => {
                commit("setUser", data)
            })
        },
        //查询所有门面信息
        setStores({ commit }, payLoad = { page: 1, rows: 5 }) {
            axios({
                method: "get",
                url: "/platform/shop",
                params: payLoad
            }).then(({ data }) => {
                commit("setStores", data.rows);
                commit("setShopPagination", data)
            })
        },
        //通过id查门店
        setStore({ commit }, id) {
            axios({
                method: "get",
                url: "/platform/findShop/" + id
            }).then(({ data }) => {
                commit("setStore", data)
            })
        },
        //查所有宠主
        setPetmasters({ commit }, payLoad = { page: 1, rows: 5 }) {
            axios({
                method: "get",
                url: "/platform/findPetmaster",
                params: payLoad
            }).then(({ data }) => {
                commit("setPetmasters", data.rows)
                commit("setPetmasterPagination", data)
            });
        }
    }
}