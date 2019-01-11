import axios from "axios"
export default {
    namespaced: true,
    state: {
        stores: [],
        store: {},
        users: [],
        user: {},
        pagination: {},
        search: {
            type: "",
            value: "",
        },
        updateShopVisible: false,
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
        setSearch(state, search) {
            state.search = search
        },
        setUpdateShopVisible(state, updateShopVisible) {
            state.updateShopVisible = updateShopVisible;
        },
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
        setStores({ commit }) {
            axios({
                method: "get",
                url: "/platform/shop",
            }).then(({ data }) => {
                commit("setStores", data);
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
        }
    }
}