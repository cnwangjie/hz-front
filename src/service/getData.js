const apiurl = 'http://127.0.0.1:2002'

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
    if (typeof data[key] === 'string')
      return key + '=' + encodeURIComponent(data[key])
  }).filter(i => i).join('&')

  if (method === 'POST') {
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    option.body = requestBody
  } else {
    url += '?' + requestBody
  }

  return fetch(apiurl + url, option).then(data => data.json())
  .then(json => {
    if ('error' in json && json.error === 'Unauthorized') {
      localStorage.removeItem('admin-token')
    }
    return json
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
