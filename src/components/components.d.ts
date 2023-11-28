import XtxSwiper from './XtxSwiper.vue'

declare module 'vue' {
  // 全局组件
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
  }
}
