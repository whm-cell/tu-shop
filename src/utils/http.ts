const BASE_URL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
const httpInterceptor = {
  invoke(option: UniApp.RequestOptions) {
    //地址
    if (!option.url.startsWith('http')) {
      option.url = BASE_URL + option.url
    }
    // 超时的事件
    option.timeout = 10000 //10秒
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)
