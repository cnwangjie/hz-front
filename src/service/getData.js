import {apiurl} from './config'

const fetchData = (url = '', method = 'GET', data = {}) => {
  const headers = new Headers
  const token = localStorage.getItem('admin-token')
  if (token) headers.append('Authorization', token)

  const option = {
    headers,
    method,
    mode: 'cors'
  }

  let requestBody = Object.keys(data).map(key => {
    return key + '=' + encodeURIComponent(data[key])
  }).filter(i => i).join('&')

  if (method === 'POST') {
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    option.body = requestBody
  } else {
    url += '?' + requestBody
  }

  return fetch(apiurl + url, option)
    .then(data => data.json())
    .then(json => {
      if ('error' in json && json.error === 'Unauthorized') {
        localStorage.removeItem('admin-token')
      }
      return json
    })
    .catch(err => {
      return {
        status: 'error',
        error: 'response_error',
        msg: 'Internal Server Error',
      }
    })
}

export const getLastestArticle = ({page, size = 10}) => {
  return fetchData(`/api/article/lastest`, 'GET', {page, size})
}

export const getArticle = id => fetchData(`/api/article/${id}`)

export const getNav = () => fetchData(`/api/nav`)

export const getArticleContains = word => fetchData(`/api/article/search`, 'GET', {word})

export const getCateArticle = cateid => fetchData(`/api/cate/${cateid}`)

export const getRandomArticle = sum => fetchData(`/api/article/random`, 'GET', {sum})

export const deleteArticle = id => fetchData(`/api/article/${id}/delete`, 'POST')

export const getToken = (username, password) => fetchData(`/auth/login`, 'POST', {
  username, password
})

export const getAllArticle = () => fetchData(`/api/article/all`)

export const addArticle = obj => fetchData(`/api/article/add`, 'POST', obj)

export const editArticle = (id, obj) => fetchData(`/api/article/${id}/edit`, 'POST', obj)

export const getAllCates = () => fetchData(`/api/cate/all`)

export const getResources = path => fetchData(`/api/resource/list`, 'GET', {path})

export const getResourceInfo = path => fetchData(`/api/resource/get`, 'GET', {path})

export const editResourceInfo = obj => fetchData(`/api/resource/edit-info`, 'POST', obj)

export const mkdir = (path, name) => fetchData(`/api/resource/mkdir`, 'POST', {path, name})

export const authValid = () => fetchData(`/auth/test`, 'POST').then(json => {
  return /success/i.test(json.status)
})


export const uploadFile = ({path, files, progressHandler}) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData
    formData.append('path', path)
    formData.append('file', files[0])

    const xhr = new XMLHttpRequest
    const token = localStorage.getItem('admin-token')
    if (!token) {
      reject('no token')
    }
    xhr.open('POST', `${apiurl}/api/resource/upload`, true)
    xhr.setRequestHeader('Authorization', token)
    xhr.upload.addEventListener('progress', result => {
      if (result.lengthComputable) {
        progressHandler(result.loaded / result.total * 100 << 0)
      }
    }, false)

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4) {
        const json = JSON.parse(xhr.responseText)
        resolve(json)
      }
    })

    xhr.send(formData)
  })
}
