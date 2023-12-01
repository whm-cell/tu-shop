import { http } from '@/utils/http'

export type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}

/**
 *
 * @param data
 */
export const postLoginWxMinApi = (data: LoginParams) => {
  return http({
    url: '/login/wxMin',
    method: 'POST',
    data,
  })
}

/**
 *
 * @param phoneNumber
 */
export const postLoginWxSimpleApi = (phoneNumber: string) => {
  return http({
    url: '/login/wxMin/simple',
    method: 'POST',
    data: {
      phoneNumber,
    },
  })
}
