import { http } from '@/utils/http'
import type { PageParams } from '@/types/global'

/**
 * 封装参数
 */
type HotParams = PageParams & { subType?: string }
/**
 * 通用的热门推荐类型
 * @param url
 * @param data
 */
export const getHotRecommendApi = (url: string, data?: HotParams) => {
  return http({
    url: url,
    method: 'GET',
    data,
  })
}
