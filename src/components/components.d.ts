import XtxSwiper from './XtxSwiper.vue'
import XtxGuess from './XtxGuess.vue'

declare module 'vue' {
  // 全局组件
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}
