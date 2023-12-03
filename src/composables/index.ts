// 封装组合式函数
import type { XtxGuessInstance } from '@/types/components'
import { ref } from 'vue'

export const useGuessList = () => {
  // 获取猜你喜欢组件实例
  const guessRef = ref<XtxGuessInstance>()

  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }

  // 返回ref和事件处理函数
  return {
    guessRef,
    onScrolltolower,
  }
}
