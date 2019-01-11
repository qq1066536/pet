import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from "../components/manage"
import UserManage from "../components/platform/UserManage"
import PetmasterManage from "../components/platform/PetmasterManage"
import StoreManage from "../components/platform/StoreManage"
import Statistics from "../components/platform/Statistics"
import Orders from "../components/Orders"
import Products from "../components/shop/index.vue"
import SupProducts from '../components/supplier/products'
import Services from "../components/Services"
<<<<<<< HEAD
=======
import shop from "../components/shop"
import SaleNum from "../components/shop/SaleNum"
import Sales from "../components/shop/Sales"
>>>>>>> 482c2cbad1a6b188daceb1638938c32a72f77400
import Register from "../components/Register/Register"
import Login from "../components/Login/Login"
Vue.use(VueRouter);
export default new VueRouter({
    routes: [
        {
            path:"/login",
            component:Login

        },   
        {
            path:"/Register",
            component:Register

        },
          
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
            },
            {
                path: "/manage/shop",
                component: shop,
                children: [{
                    path: "/manage/shop/salenum",
                    component: SaleNum
                }, {
                    path: "/manage/shop/sales",
                    component: Sales
                }
                ]
            }
        
            ]
        }
    ],
    mode: 'history'
})