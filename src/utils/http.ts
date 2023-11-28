import { useMemberStore } from '@/stores'

const BASE_URL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
const httpInterceptor = {
  invoke(option: UniApp.RequestOptions) {
    //地址
    if (!option.url.startsWith('http')) {
      option.url = BASE_URL + option.url
    }
    // 添加小程序段请求标识
    option.header = {
      ...option.header, // 保留 option.header 中的请求头
      'source-client': 'miniapp',
    }
    // 添加token
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      option.header = {
        ...option.header,
        Authorization: token,
      }
    }
    // 超时的事件
    option.timeout = 10000 //10秒
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)
