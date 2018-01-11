import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navs: [],
    articles: [],
    cates: [],
    nearlyReaded: [],
  },
  getters: {
  },
  actions: {
  },
  mutations: {
    readed(state, article) {
      state.nearlyReaded.push(article)
    },
    setNavs(state, obj) {
      state.navs = obj
    },
    changeNavsActiveStatus(state, {
      name,
      path,
    }) {
      state.navs = state.navs.map(i => {
        i.active = name === i.name || path === i.name
        return i
      })
    }
  },
})
