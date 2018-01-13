import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import Class from '@/page/Class'
import ClassDetail from '@/components/ClassDetail'
import ClassContent from '@/components/ClassContent'
import Info from '@/page/Info'
import Page from '@/page/Page'
import Article from '@/page/Article'
import Search from '@/page/Search'
import Cate from '@/page/Cate'
import Archive from '@/page/Archive'
import Admin from '@/page/admin/Index'
import ArticleAdmin from '@/page/admin/ArticleAdmin'
import ResourceAdmin from '@/page/admin/ResourceAdmin'
import ArticleEdit from '@/page/admin/ArticleEdit'
import AdminLogin from '@/page/admin/Login'
import MultiContentHomePage from '@/page/MultiContentHomePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MultiContentHomePage,
      name: 'home'
    },
    {
      path: '/tradition',
      component: Home,
    },
    {
      path: '/class',
      component: Class,
      name: 'class',
    },
    {
      path: '/class/:name',
      component: ClassDetail,
      name: 'classDetail'
    },
    {
      path: '/class/:name/:type',
      component: ClassContent,
      name: 'classContent'
    },
    {
      path: '/info',
      component: Info,
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
      path: '/admin/login',
      component: AdminLogin,
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: 'article/new',
          component: ArticleEdit,
          name: 'articleNew'
        },
        {
          path: 'article/:id',
          component: ArticleEdit,
          name: 'articleEdit'
        },
        {
          path: 'article',
          component: ArticleAdmin,
          name: 'articleAdmin',
        },
        {
          path: 'resource/:path*',
          component: ResourceAdmin,
          name: 'resourceAdmin'
        }
      ]
    }
  ]
})
