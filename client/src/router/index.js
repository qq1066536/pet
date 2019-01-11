import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from "../components/manage"
import UserManage from "../components/platform/UserManage"
import PetmasterManage from "../components/platform/PetmasterManage"
import StoreManage from "../components/platform/StoreManage"
import Statistics from "../components/platform/Statistics"
import Producer from "../components/producer"
import Orders from "../components/Orders"
import Products from "../components/shop/index.vue"
import SupProducts from '../components/supplier/products'
import Services from "../components/Services"
Vue.use(VueRouter);
export default new VueRouter({
    routes: [
        {
            path: '/manage',
            component: Manage,
            children: [{
                path: "/manage/platform/UserManage",
                component: UserManage
            },
            {
                path: "/manage/platform/PetmasterManage",
                component: PetmasterManage
            },
            {
                path: "/manage/platform/StoreManage",
                component: StoreManage
            },
            {
                path: "/manage/platform/Statistics",
                component: Statistics
            },
            {
                path: "/manage/producer",
                component: Producer
            },{
                path:"/manage/supplier/products",
                component:SupProducts
            }, {
                path: "/manage/supplier/products",
                component: SupProducts
            },
            {
                path: "/manage/orders",
                component: Orders
            },
            {
                path: "/manage/shop",
                component: Products
            }, {
                path: "/manage/supplier/products",
                component: SupProducts
            }, {
                path: "/manage/services",
                component: Services
            }
            ]
        }
    ],
    mode: 'history'
})