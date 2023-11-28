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

interface ResponseData<T = any> {
  code: number
  msg: string
  result: T
}

// 封装请求函数
export const http = <T>(option: UniApp.RequestOptions) => {
  return new Promise<ResponseData<T>>((resolve, reject) => {
    uni.request({
      ...option,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as ResponseData<T>)
        } else if (res.statusCode === 401) {
          const memberStore = useMemberStore()
          memberStore.clearProfile() // 401 清除token
          uni.navigateTo({
            url: '/pages/login/login',
          }) // 去登录页面  === === 重定向页面
        } else {
          // 业务除了问题的阶段
          uni.showToast({
            title: (res.data as ResponseData<T>).msg || '请求失败',
            icon: 'none',
          })
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '网络错误，请稍后再试',
          icon: 'none',
        })
        reject(err)
      },
    })
  })
}
