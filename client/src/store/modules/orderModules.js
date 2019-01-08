import axios from "axios"
export default {
    strict: true,
    namespaced: true,
    state: {
        data: [],
        pagination: {},
        updateInfo: {},
        dialogVisible: false,
        search: {
            type: "",
            value: "",
        },
    },
    mutations: {
        setStudents: function (state, data) {
            state.data = data;
        },
        setStuInfo: function (state, data) {
            state.updateInfo = data;
        },
        setUpdateVisible: function (state, bool) {
            state.dialogVisible = bool;
        },
        setSearch:function(state,search){
            state.search = search
        },
        setPagination: function (state, data) {
            state.pagination = data;
        },
    },
    actions: {
        setStudents: function ({ commit },payload={page:1,row:5}) {
            axios({
                methods: "get",
                url: "/students",
                params: payload
            }).then(({ data }) => {
                // console.log(data)
                commit('setStudents', data.rows)
                commit('setPagination', data)
            })
        },
        setStuInfo: function ({ commit }, id) {
            axios({
                method: "get",
                url: "/students/" + id,
            }).then(({ data }) => {
                commit('setStuInfo', data)
            })
        }
    }
}