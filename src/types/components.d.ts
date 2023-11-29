import XtxSwiper from '../components/XtxSwiper.vue'
import XtxGuess from '../components/XtxGuess.vue'

declare module 'vue' {
  // 全局组件
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}

// 组件实例类型
/**
 * typeof XtxGuess 获取到的是组件的构造函数 ，组件的类型
 * InstanceType<typeof XtxGuess> 获取到的是组件的实例类型
 */
export type XtxGuessInstance = InstanceType<typeof XtxGuess>
