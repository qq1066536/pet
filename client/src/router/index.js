import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from "../components/manage"
import UserManage from "../components/platform/UserManage"
import PetmasterManage from "../components/platform/PetmasterManage"
import StoreManage from "../components/platform/StoreManage"
import Statistics from "../components/platform/Statistics"
<<<<<<< HEAD
import SupProducts from '../components/supplier/products'
=======
import Orders from "../components/Orders"
import Services from "../components/Services"
>>>>>>> b6fe32d5b26307d865b57aa1989b11b1f67cb50c
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
<<<<<<< HEAD
            },{
                path:"/manage/supplier/products",
                component:SupProducts
=======
            },
            {
                path: "/manage/orders",
                component: Orders
            },
            {
                path: "/manage/services",
                component: Services
>>>>>>> b6fe32d5b26307d865b57aa1989b11b1f67cb50c
            }
            ]
        }
    ],
    mode: 'history'
})