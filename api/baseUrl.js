/* eslint-disable import/no-mutable-exports */
let baseUrl = 'https://blog-api.boycot.top'
let apiUrl = 'https://api.boycot.top/api'
let weatherApi = '/weather'
const env = process.env.NODE_ENV
console.log(env, 'env')
switch (env) {
  case 'development':
    // baseUrl = 'http://127.0.0.1:3009'
    apiUrl = 'http://api.boycot.top/api'
    // apiUrl = 'http://43.138.211.108:8090/api'
    weatherApi = apiUrl + '/weather'
    // baseUrl = 'http://blog-api.boycot.top'
    // baseUrl = 'http://43.138.211.108:4000'
    break
  case 'production':
    apiUrl = 'https://api.boycot.top/api'
    // apiUrl = 'http://43.138.211.108:8090/api'
    weatherApi = apiUrl + '/weather'
    baseUrl = 'https://blog-api.boycot.top'
    // baseUrl = 'http://43.138.211.108:4000'
    break
  default:
    break
}
export {
  apiUrl,
  baseUrl,
  weatherApi,
}
