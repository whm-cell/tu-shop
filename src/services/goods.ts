import { http } from '@/utils/http'

export const getGoodsDetailApi = (id: string) => {
  return http({
    method: 'GET',
    url: '/goods',
    data: {
      id,
    },
  })
}
