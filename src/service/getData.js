const apiurl = 'http://127.0.0.1:2002'

const fetchData = (url = '', method = 'GET', body = {}) => {
  const headers = new Headers
  const token = localStorage.getItem('admin-token')
  if (token) headers.append('Authorization', token)
  const formdata = new FormData
  for (let key in body) {
    formdata.append(key, body[key])
  }
  return fetch(apiurl + url, {
    headers,
    method,
    body: method !== 'GET' ? formdata : undefined,
  }).then(data => data.json())
}

export const getLastestArticle = page => {
  return fetchData(`/api/article/lastest?page=${page}`)
}

export const getArticle = id => fetchData(`/api/article/${id}`)

export const getNav = () => fetchData(`/api/nav`)

export const getArticleContains = word => fetchData(`/api/article/search?word=${word}`)

export const getCateArticle = cateid => fetchData(`/api/cate/${cateid}`)

export const getRandomArticle = sum => fetchData(`/api/article/random?sum=${sum}`)

export const deleteArticle = id => fetchData(`/api/article/${id}/delete`, 'POST')

export const getToken = (username, password) => fetchData(`/auth/login`, 'POST', {
  username, password
})

export const getAllArticle = () => fetchData(`/api/article/all`)

export const addArticle = (obj) => fetchData(`/api/article/new`, 'POST', obj)

export const editArticle = (id, obj) => fetchData(`/api/article/${id}/edit`, 'POST', obj)
