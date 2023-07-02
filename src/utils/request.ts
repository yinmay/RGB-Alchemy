import axios, { AxiosRequestConfig } from 'axios'

const client = axios.create({
  baseURL: `http://localhost:9876/init`,
})

/**
 * Request Wrapper with default success/error actions
 */
const request = function (options: AxiosRequestConfig<any>) {
  const onSuccess = function (response: { data: any }) {
    console.debug('Request Successful!', response)
    return response.data
  }

  const onError = function (error: {
    config: any
    response: { status: any; data: any; headers: any }
    message: any
  }) {
    console.error('Request Failed:', error.config)

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error('Status:', error.response.status)
      console.error('Data:', error.response.data)
      console.error('Headers:', error.response.headers)
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message)
    }

    return Promise.reject(error.response || error.message)
  }

  return client(options).then(onSuccess).catch(onError)
}

export default request
