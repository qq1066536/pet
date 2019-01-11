import axios from "axios"
export default {
    namespaced: true,
    state: {
        stores: [],
        users: [],
        user: {},
        pagination: {},
        search: {
            type: "",
            value: "",
        }
    },
    getters: {},
    mutations: {
        setStores(state, stores) {
            state.stores = stores;
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