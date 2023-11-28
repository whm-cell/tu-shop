import type { BannerItem, CategoryItem, HotItem } from '@/styles/home'
import { http } from '@/utils/http'
/**
 * 首页轮播图接口
 * @param distributionSite
 */
export const getHomeBannerApi = (distributionSite?: 1 | 2) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}

/**
 * 首页分类接口
 */
export const getHomeCategoryApi = () => {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli',
  })
}

/**
 * 获取首页推荐
 */
export const getHomeRecommendApi = () => {
  return http<HotItem[]>({
    method: 'GET',
    url: '/home/hot/mutli',
  })
}
