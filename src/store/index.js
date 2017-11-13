import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navs: [],
    articles: [],
    cates: [],
  },
  getters: {
  },
  actions: {
  },
  mutations: {
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
