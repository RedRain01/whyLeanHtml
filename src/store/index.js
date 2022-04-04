import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production', 直接修改state 抛出异常

  getters: {
    getDemoValue: state => state.dynamicRouters,
    getrouterNum: state => state.routerNum
  },
    state: {
    routerNum:1,
    dynamicRouters:[

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
          path: '/test',
          name: 'test',
          component: resolve => require(['@/components/liftscore/first.vue'], resolve)
      },
      {
          path: '',
          name: 'why_manager',
          component: resolve => require(['@/views/layout/layout.vue'], resolve),
          redirect: '/login',
          children: [
            //   { // 角色管理
            //       path: 'roleManager',
            //       name: 'roleManager',
            //       component: resolve => require(['@/components/roleManager/roleManager.vue'], resolve)
            //   },
            //   { // 角色管理
            //     path: 'flink',
            //     name: 'flink',
            //     component: resolve => require(['@/components/flink/flink.vue'], resolve)
            // },
            //   { // 支付流水
            //       path: 'liftscore',
            //       name: 'liftscore',
            //       component: resolve => require(['@/components/liftscore/liftscore.vue'], resolve)
            //  },
          ]
      }
  ]

  },
   //这里是set方法
  mutations: {
    updateRouter(state,ruter){
      state.dynamicRouters.push(ruter)
    }
  },
  actions: {

  },
})

export default store
