<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import { getHomeBannerApi, getHomeCategoryApi } from '@/services/home'
import type { BannerItem, CategoryItem } from '@/styles/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const banerList = ref<BannerItem[]>([])
const categoryList = ref<CategoryItem[]>([])
const getData = async () => {
  const res = await getHomeBannerApi(1)
  banerList.value = res.result
}

/**
 * 获取前台分类的数据
 */
const getCategoryData = async () => {
  const res = await getHomeCategoryApi()
  categoryList.value = res.result
}

// 生命周期 - onLoad - 页面加载时触发，一个页面只会调用一次
onLoad(() => {
  getData()
  getCategoryData()
})
</script>

<template>
  <CustomNavbar />
  <XtxSwiper :list="banerList" />
  <CategoryPanel :list="categoryList" />
  <view class="index"></view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
