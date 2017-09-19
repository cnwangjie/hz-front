import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import Class from '@/page/Class'
import ClassDetail from '@/components/ClassDetail'
import Index from '@/page/Index'
import Page from '@/page/Page'
import Article from '@/page/Article'
import Search from '@/page/Search'
import Cate from '@/page/Cate'
import Archive from '@/page/Archive'
import Admin from '@/page/admin/Index'
import ArticleAdmin from '@/page/admin/ArticleAdmin'
import ResourceAdmin from '@/page/admin/ResourceAdmin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home'
    },
    {
      path: '/class',
      component: Class,
      name: 'class',
      children: [
        {
          path: ':name',
          component: ClassDetail,
          name: 'classDetail'
        }
      ]
    },
    {
      path: '/info',
      component: Index,
      name: 'info'
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
      path: '/cate/:cate_id',
      component: Cate,
      name: 'cate'
    },
    {
      path: '/archive',
      component: Archive,
      name: 'archive'
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: 'article',
          component: ArticleAdmin
        },
        {
          path: 'resource/:path*',
          component: ResourceAdmin
        }
      ]
    }
  ]
})
