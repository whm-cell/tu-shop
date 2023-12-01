import { http } from '@/utils/http'
import type { LoginResult } from '@/types/member'

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
  return http<LoginResult>({
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
  return http<LoginResult>({
    url: '/login/wxMin/simple',
    method: 'POST',
    data: {
      phoneNumber,
    },
  })
}
