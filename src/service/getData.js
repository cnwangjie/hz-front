const apiurl = 'http://127.0.0.1:2002'

const fetchData = (url = '', method = 'GET', body = {}) => {
  return fetch(apiurl + url, {
    method,
    body,
  }).then(data => data.json())
}

export const getLastestArticle = page => {
  return fetchData(`/api/article/lastest?page=${page}`)
}

export const getArticle = id => fetchData(`/api/article/${id}`)

export const getNav = () => fetchData(`/api/nav`)

export const getArticleContains = word => fetchData(`/api/article/search?word=${word}`)
