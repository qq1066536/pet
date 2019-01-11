import axios from "axios"
export default {
    // strict: true,
    namespaced: true,
    state: {
        dialogVisible: { visible: false },
        products: [],
        product: {},
        id: "5c32ef8a6c9da2c6832b81fe",
        pid: "",
        pagination: {},
        dialogImageUrls: [{
            url: "1.png"
        }],
        dialogVisible: {
            visible: false
        },
        dialogImageUrl: "",
        title: {
            name: ""
        }
    },
    mutations: {
        setDialogVisible(state, data) {
            state.dialogVisible.visible = data
        },
        // 设置供应商的id
        setId(state, data) {
            state.id = data
        },
        // 设置所有商品
        setProducts(state, data) {
            state.products = data
        },
        // 设置分页
        setPagination: function (state, data) {
            state.pagination = data;
        },
        // 获取产品的id
        getPid: function (state, data) {
            state.pid = data
        },
        // 修改产品时，获取产品数据
        setProduct: function (state, data) {
            state.product = data
        },
        // 设置弹出框的标题
        setTitle: function (state, data) {
            state.title = { name: data }
        },
        // 上传图片时，添加到数据库
        adddialogImageUrls: function (state, data) {
            console.log(data)
            if (!Array.isArray(state.product.img)) {
                state.product.img = []
                state.product.img.push({ url: data })
            }
            state.product.img.push({ url: data })
        },
        // 移除某张图片
        removedialogImageUrls: function (state, data) {
            state.product.img.splice(state.dialogImageUrls.indexOf({ url: data }), 1)
        }
    },
    actions: {
        setProducts: function ({ commit, state }, payload = { page: 1, row: 5 }) {
            let id = state.id
            axios({
                methods: "get",
                url: "/supplier",
                params: { id, ...payload }
            }).then(({ data }) => {
                commit('setPagination', data)
                data = data.rows
                let imgs = []
                // 将img数组对象转换成字符串
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].img.length; j++) {
                        imgs.push(data[i].img[j].url)
                    }
                    data[i].img = imgs.join(",")
                }
                commit('setProducts', data)
            })
        },
        getProduct: function ({ commit, state }) {
            let id = state.id
            let proid = state.pid
            // console.log("getProduct",proid)
            axios({
                method: "get",
                url: `/supplier/${proid}`,
                params: { id }
            }).then(({ data }) => {
                // console.log(data)
                commit('setProduct', data)
            })
        },
        updateProduct: function ({ commit, state, dispatch }) {
            let id = state.product._id
            delete state.product._id
            delete state.product.supplier
            axios({
                url: "/supplier/" + id,
                method: "put",
                data: { ...state.product }
            }).then(res => {
                commit("setProduct", {})
                dispatch("setProducts")

            })
        },
        addProduct: function ({ state, commit, dispatch }) {

            axios({
                url: "/supplier/" + state.id,
                method: "post",
                data: { ...product }
            }).then(res => {
                commit("setProduct", {})
                dispatch("setProducts")
            })
        }

    }
}