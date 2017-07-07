import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Page from '@/components/Page'
import Article from '@/components/Article'
import Search from '@/components/Search'
import Cate from '@/components/Cate'

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
    },
    {
      path: '/search',
      component: Search,
      name: 'search'
    },
    {
      path: '/cate/:cate',
      component: Cate,
      name: 'cate'
    }
  ]
})
