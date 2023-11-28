<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBannerApi } from '@/services/home'
import type { BannerItem } from '@/styles/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const banerList = ref<BannerItem[]>([])
const getData = async () => {
  const res = await getHomeBannerApi(1)
  banerList.value = res.result
}

// 生命周期 - onLoad - 页面加载时触发，一个页面只会调用一次
onLoad(() => {
  getData()
})
</script>

<template>
  <CustomNavbar />
  <XtxSwiper :list="banerList" />
  <view class="index"></view>
</template>

<style lang="scss">
//
</style>
