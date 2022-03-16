import axios from 'axios'
import {getToken, removeToken, removeUserInfo} from "./auth";
import {showSuccessMsg, showErrorMsg} from "./msg";
import Vue from "vue";
import router from "@/router";

const TOKEN_PREFIX = 'Bearer '
// create an axios instance
const service = axios.create({
    baseURL: 'http://localhost:3000', // url = base url + request url
    timeout: 5000, // request timeout
});

/**
 * 错误函数 解析常用的http状态码
 * 2xx：成功
 * 3xx: 重定向
 * 4xx: 资源不存在
 * 5xx：服务器错误
 * 
 */
 const  ErrorHandle=(status, info) => {
    switch (status) {
        case 400:
            console.log('400-表示请求报文中存在语法错');
            break;
        case 401:
            console.log('401-未经许可，需要通过HTTP认证');
            break;
        case 403:
            console.log('403-服务器拒绝该次访问（访问权限出现问题）');
            break;
        case 404:
            console.log('404-表示服务器上无法找到请求的资源');
            break;
        case 500:
            console.log('500-表示服务器在执行请求时发生了错误，也有可能是web应用存在的bug或某些临时的错误时；');
            break;
        case 503:
            console.log('503-表示服务器暂时处于超负载或正在进行停机维护，无法处理请求');
            break;
        default:
            console.log(info);
            break;
    }
}

// 添加请求拦截器，若token存在则在请求头中加token，不存在也继续请求
service.interceptors.request.use(
    config => {
        // 每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器,没有则不带token
        // Authorization是必须的
        if (getToken()) {
            config.headers.Authorization = TOKEN_PREFIX + getToken()
        }
        return config;
    },
    error => {
        console.log("在request拦截器显示错误：", error.response)
        return Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    resp => {
        // 未设置状态码则默认成功状态
        const code = resp.data.code || 200;
        // 获取响应信息
        const msg = resp.data.msg
        if (code === 200) {
            return resp
        } else if (code === 401) {
            removeToken()
            removeUserInfo()
            // Vue.toasted.show('您还未登录，去登录吗？', {
            //     position: 'top-center', duration: null, type: 'error',
            //     action: [
            //         {
            //             text: '取消',
            //             onClick: (e, toastObject) => {
            //                 toastObject.goAway(0);
            //             }
            //         },
            //         {
            //             text: '登录',
            //             push: {
            //                 name: 'Login',
            //                 params: {fromPath: router.currentRoute.path},
            //                 // this will prevent toast from closing
            //             },
            //         }
            //     ]
            // })
            console.log(router.currentRoute.path)
            // 以路径后面挂参数的方式传参，刷新时不会丢失参数
            router.push({path: '/login', query: {fromPath: router.currentRoute.path}})
        } else {
            Vue.toasted.show(msg, {position: 'top-center', duration: 3000, theme: 'outline', type: 'error'})
        }
        return Promise.reject(new Error(msg))
    },
    error => {
        console.log('err: ' + error)
        let {message} = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "后端接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "后端接口" + message.substr(message.length - 3) + "异常";
        }
        showErrorMsg(message)
        return Promise.reject(error)
    }
);


export default service