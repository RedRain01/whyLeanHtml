import Vue from 'vue';
import App from './app.vue';
import router from './router.js';
import { Message } from "element-ui";
import * as filters from "./util/filters.js";
import axios from 'axios';
import moment from "moment";
import echarts from 'echarts'
import "@/assets/css/reset.css";
import "@/assets/icons/iconfont.css";

Vue.prototype.$ajax = axios;
Vue.prototype.$moment = moment;
Vue.prototype.$echarts = echarts;
Vue.prototype.$message = Message;

// 注册全局filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

var vm = new Vue({
    el: '#app',
    router,
    render: (h) => h(App)  // 通过创建DOM元素返回参数h将App挂载，h即为hyperscript，用来实现虚拟DOM的
});