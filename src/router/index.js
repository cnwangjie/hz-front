import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Page from '@/components/Page'
import Article from '@/components/Article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      name: 'home'
    },
    {
      path: '/page/:pagename',
      component: Page,
      name: 'page'
    },
    {
      path: '/article/:id',
      component: Article,
      name: 'article'
    }
  ]
})
