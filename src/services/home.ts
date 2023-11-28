import type { BannerItem } from '@/styles/home'
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
