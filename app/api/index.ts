import { ApiParams } from '@/app/types/types'

export const api = ({ url, additionalParam }: ApiParams) => {
  let apiUrl = `${process.env.BASE_URL}${url}&appid=${process.env.API_KEY}`

  if (additionalParam) {
    apiUrl += additionalParam
  }

  return fetch(apiUrl, {
    cache: 'force-cache',
  }).then(e => e.json())
}
