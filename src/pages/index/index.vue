<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import { getHomeBannerApi, getHomeCategoryApi, getHomeRecommendApi } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import HotPanel from '@/pages/index/components/HotPanel.vue'
import type { XtxGuessInstance } from '@/types/components'

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

// 获取猜你喜欢组件的实例 - instance
const guessRef = ref<XtxGuessInstance>()
/**
 * 触底加载更多 , 触底的时候触发
 */
const onScrolltolower = () => {
  guessRef.value?.getMore()
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

  <scroll-view @scrolltolower="onScrolltolower" class="scroll-view" scroll-y>
    <XtxSwiper :list="banerList" />
    <CategoryPanel :list="categoryList" />
    <HotPanel :list="hotList" />
    <XtxGuess ref="guessRef" />
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex; // 因为height设置了100%  ，所以这种是基于屏幕高度而设置的一个flex布局
  flex-direction: column; // 改变主轴方向
}

.scroll-view {
  flex: 1;
}
</style>
