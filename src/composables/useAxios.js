import axios from 'axios'
import { readonly, ref } from 'vue'

const apiVersion = 'v1'
const apiBaseUrl = `https://accounts.myren.xyz/api/${apiVersion}/`

export const Axios = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

/* Axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''

  return config
}) */

export default () => {
  const loading = ref(false)
  const payload = ref(null)
  const error = ref(null)
  const success = ref(false)

  const get = async (url, headers = {}) => {
    loading.value = true
    try {
      const response = await Axios.get(url, { headers })
      const responseData = response.data
      payload.value = responseData
      if (response.status && responseData.ok) {
        loading.value = false
        success.value = true
      }
      if (response.status && !responseData.ok) {
        error.value = responseData.data
        console.error(error.value)
      }
    } catch (err) {
      error.value = err
    }
  }

  const post = async (url, data = {}, headers = {}) => {
    loading.value = true
    try {
      const response = await Axios.post(url, data, { headers })
      const responseData = response.data
      payload.value = responseData
      if (response.status && responseData.ok) {
        loading.value = false
        success.value = true
      }
      if (response.status && !responseData.ok) {
        error.value = responseData.data
        console.error(error.value)
      }
    } catch (err) {
      error.value = err
    }
  }

  return {
    payload: readonly(payload),
    loading: readonly(loading),
    error: readonly(error),
    success: readonly(success),
    get,
    post
  }
}
