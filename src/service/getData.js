const apiurl = 'http://127.0.0.1:2002'

const fetchData = (url = '', method = 'GET', body = {}) => {
  return fetch(apiurl + url, {
    method,
    body,
  }).then(data => data.json())
}

export const getArticle = page => fetchData(`/api/article/lastest?page=${page}`)
