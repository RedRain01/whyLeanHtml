import Vue from "vue";
import VueRouter from 'vue-router'
import store from "./store";



//加载路由中间件
Vue.use(VueRouter)

const router = new VueRouter({
    mode: process.env.NODE_ENV == 'development' ? '' : 'history',
   //   base: '/why_manager',
    base: '',
    //  base: '',
   routes: [

        { // login
            path: '/login',
            name: 'login',
            component: resolve => require(['@/components/login/login.vue'], resolve)
        },
        { // first
            path: '/404',
            name: '404',
            component: resolve => require(['@/components/liftscore/first.vue'], resolve)
        },
        { // first
            path: '/rrr',
            name: 'rrr',
            component: resolve => require(['@/components/liftscore/first.vue'], resolve)
        },

        {
            path: '',
            name: 'why_manager',
            component: resolve => require(['@/views/layout/layout.vue'], resolve),
            redirect: '/login',
            children: [
            //     { // 角色管理
            //     path: 'roleManager',
            //     name: 'roleManager',
            //     component: resolve => require(['@/components/roleManager/roleManager.vue'], resolve)
            // },
            { // 支付流水
                path: 'liftscore',
                name: 'liftscore',
                component: resolve => require(['@/components/liftscore/liftscore.vue'], resolve)
            },
            ]
        }
    ]
})


router.beforeEach((to, from, next) => {
    var routersss = store.state.dynamicRouters
    // var menus = localStorage.getItem('aaa');
    var children = [];
    if (to.path === '/login') {
        next()
    } else {
        const accessToken = localStorage.getItem('Authorization');
        var menu = JSON.parse(localStorage.getItem('menu'));
        if (accessToken != null) {
            if (to.matched.length < 1) {
                var route = {};
                for (let i = 0, l = menu.length; i < l; i++) {
                    if (menu[i].menuPid > 0) {
                        var route = {
                            path: menu[i].menuName,
                            name: menu[i].menuName,
                            component: resolve =>
                                require([
                                    '@/components/' + menu[i].path
                                ], resolve)
                        }
                        children.push(route)
                    }
                }
                for (let index = 0; index < routersss.length; index++) {
                    if (routersss[index].name === 'why_manager') {
                        routersss[index].children = children
                    }
                }
                var routerBolen=store.getters.getrouterNum>10?true:false;
                if (routerBolen) {
                    store.state.routerNum =1
                    next({ path: 'login' })
                 }else{
                    store.state.routerNum ++
                    router.addRoutes(routersss);
                    next({ ...to, replace: true })
                 }
            } else {
                next()
            }
        } else {
            next()
           // next({ path: 'login' })  取消登录验证
        }
        next()
    }
    next()
})


export default router

