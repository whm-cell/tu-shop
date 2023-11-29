import type { BannerItem, CategoryItem, GuessItem, HotItem } from '@/styles/home'
import { http } from '@/utils/http'
import type { PageParams, PageResult } from '@/styles/global'
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

/**
 * 获取首页猜你喜欢
 * @param data
 */
export const getHomeGoodsGuessLikeApi = (data?: PageParams) => {
  return http<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data,
  })
}
