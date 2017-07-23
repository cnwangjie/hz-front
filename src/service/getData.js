const apiurl = 'http://127.0.0.1:2002'

const fetchData = (url = '', method = 'GET', data = {}) => {
  const headers = new Headers
  const token = localStorage.getItem('admin-token')
  if (token) headers.append('Authorization', token)
  let body = ''
  for (let key in data) {
    body += key + '=' + data[key] + '&'
  }
  body = body.substr(0, body.lastIndexOf('&'))
  return fetch(encodeURI(apiurl + url + '?' + body), {
    headers,
    method,
    mode: 'cors'
  }).then(data => data.json())
  .then(json => {
    if ('error' in json && json.error === 'Unauthorized') {
      localStorage.removeItem('admin-token')
    }
    return json
  })
}

export const getLastestArticle = page => {
  return fetchData(`/api/article/lastest`, 'GET', {page})
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

export const addArticle = (obj) => fetchData(`/api/article/add`, 'POST', obj)

export const editArticle = (id, obj) => fetchData(`/api/article/${id}/edit`, 'POST', obj)
