<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import { getHomeBannerApi, getHomeCategoryApi, getHomeRecommendApi } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/styles/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import HotPanel from '@/pages/index/components/HotPanel.vue'

const banerList = ref<BannerItem[]>([])
const categoryList = ref<CategoryItem[]>([])
const hotList = ref<HotItem[]>([])
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

/**
 * 获取推荐商品的数据
 */
const getHotData = async () => {
  const res = await getHomeRecommendApi()
  hotList.value = res.result
}

// 生命周期 - onLoad - 页面加载时触发，一个页面只会调用一次
onLoad(() => {
  getData()
  getCategoryData()
  getHotData()
})
</script>

<template>
  <CustomNavbar />
  <XtxSwiper :list="banerList" />
  <CategoryPanel :list="categoryList" />
  <HotPanel :list="hotList" />
  <view class="index"></view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
