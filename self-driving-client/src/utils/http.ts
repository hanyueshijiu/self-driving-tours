import axios from 'axios';

// 创建axios实例
const http = axios.create({
  baseURL: 'http://localhost:3000', // API 基础路径
  timeout: 10000, // 请求超时时间
});

// 设置post请求头
http.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器
http.interceptors.request.use(
  config => {
    // 可以在这里添加认证信息 header，例如:
    // config.headers.Authorization = `Bearer ${token}`;
    
    // 操作请求配置
    console.log('Request Interceptor:', config);
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    console.log('Response Interceptor:', response);
    return response;
  },
  error => {
    // 响应错误处理
    console.error('Response Error:', error);
    if (error.response && error.response.data) {
      // 服务器返回不是 2 开头的状态码，可以在这里处理错误响应
      console.error('Error Response:', error.response);
    }
    return Promise.reject(error);
  }
);

export default http;
