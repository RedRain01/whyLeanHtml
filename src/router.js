import VueRouter from 'vue-router'

export default new VueRouter({
    mode: process.env.NODE_ENV == 'development' ? '' : 'history',
    base: '/sdh_manager/',
    routes: [
        { // 营业执照大图
            path: '/viewLincense_img',
            name: 'viewLincense_img',
            component: resolve => require(['@/components/ys/viewLincense_img.vue'], resolve)
        },
        { // login
            path: '/login',
            name: 'login',
            component: resolve => require(['@/components/login/login.vue'], resolve)
        },
        {
            path: '',
            name: 'sdh_manager',
            component: resolve => require(['@/views/layout/layout.vue'], resolve),
            redirect: '/login',
            children: [
                { // 欢迎页
                    path: 'welcome',
                    name: 'welcome',
                    component: resolve => require(['@/components/welcome/welcome.vue'], resolve)
                },
                { // 职工信息
                    path: 'staffInfo',
                    name: 'staffInfo',
                    component: resolve => require(['@/components/flinkTest/staffInfo.vue'], resolve)
                },
                { // 角色管理
                    path: 'roleManager',
                    name: 'roleManager',
                    component: resolve => require(['@/components/roleManager/roleManager.vue'], resolve)
                },
                { // 支付流水
                    path: 'liftscore',
                    name: 'liftscore',
                    component: resolve => require(['@/components/liftscore/liftscore.vue'], resolve)
                },
                { // 二级测试
                    path: 'roleManager111',
                    children:[{ // 职工信息
                    path: 'staffInfo',
                    name: 'staffInfo',
                     component: resolve => require(['@/components/flinkTest/staffInfo.vue'], resolve)
                }]
                },
                { // 支付流水
                    path: 'paymentFlow',
                    name: 'paymentFlow',
                    component: resolve => require(['@/components/paymentFlow/paymentFlow.vue'], resolve)
                },
              
                { // 支付流水
                    path: 'structure',
                    name: 'structure',
                    component: resolve => require(['@/components/flinkTest/structure.vue'], resolve)
                },
                { // 支付流水
                    path: 'abountPro',
                    name: 'abountPro',
                    component: resolve => require(['@/components/flinkTest/abountPro.vue'], resolve)
                },
                { // 支付流水
                    path: 'summary',
                    name: 'summary',
                    component: resolve => require(['@/components/flinkTest/summary.vue'], resolve)
                },
                { // 退款流水
                    path: 'refundFlow',
                    name: 'refundFlow',
                    component: resolve => require(['@/components/refundFlow/refundFlow.vue'], resolve)
                }
               
            ]
        }
    ]
})