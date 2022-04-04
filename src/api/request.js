import axios from 'axios'
import { Message,MessageBox } from 'element-ui'
/*axios.defaults.withCredentials=true; */
axios.defaults.headers['Content-Type'] = 'application/json';

const instance = axios.create({
    crossdomain: true,
    baseURL: process.env.API_ROOT,
    timeout: 20000,
});

instance.interceptors.request.use(config => {
    if (config.url.match('login')) {
        return config;
    } else {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
            return config;
          }else{
           // VueRouter.push("/login"); // 跳转到登录页面
           // this.$router.push("/login"); // 跳转到登录页面
            return Promise.reject(error);   
          }
    }
  })

instance.interceptors.response.use(function(response){
    var data = response.data;
    if (data.status == 'noLogin') {
        MessageBox.confirm('您没有登录, 请登录', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          cancelButtonText: '取消',
          type: 'warning',
          showClose: false,
          closeOnClickModal: false
        }).then(() => {
          window.open(process.env.HOME_URL+'login','_self');
          return false;
        })
      }else {
          return data;
      }
},function(error){
    if(error.message.indexOf('timeout')>=0){
        Message({
            message: '请求超时',
            type: 'error',
            duration: 5 * 1000
        })
    }else{
        Message({
            message: '系统异常',
            type: 'error',
            duration: 5 * 1000
        })
    }
    return Promise.reject(error);
});

export default instance;