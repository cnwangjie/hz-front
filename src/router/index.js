import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
import Page from '@/page/Page'
import Article from '@/page/Article'
import Search from '@/page/Search'
import Cate from '@/page/Cate'
import Admin from '@/page/admin/Index'
import ArticleAdmin from '@/page/admin/ArticleAdmin'

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
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: 'article',
          component: ArticleAdmin
        }
      ]
    }
  ]
})
