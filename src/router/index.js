import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制面板', icon: 'dashboard' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/form-user',
    name: 'user',
    meta: { title: '个人信息管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'form-user',
        name: 'FormUser',
        component: () => import('@/views/user/formuser/index'),
        meta: { title: '修改个人信息', icon: 'table' }
      },
      {
        path: 'form-password',
        name: 'FormPassword',
        component: () => import('@/views/user/formpassword/index'),
        meta: { title: '修改密码', icon: 'table' }
      }
    ]
  },

  {
    path: '/participant',
    component: Layout,
    redirect: '/participant/table',
    name: 'participant',
    meta: { title: '参赛者管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/participant/table/index'),
        meta: { title: '参赛者列表', icon: 'table' }
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/participant/form/index'),
        meta: { title: '新增参赛者', icon: 'tree' }
      }
    ]
  },

  {
    path: '/match',
    component: Layout,
    redirect: '/match/table',
    name: 'match',
    meta: { title: '赛事管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/match/table/index'),
        meta: { title: '赛事列表', icon: 'table' }
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/match/form/index'),
        meta: { title: '新增赛事', icon: 'tree' }
      }
    ]
  },

  {
    path: '/program',
    component: Layout,
    redirect: '/program/table',
    name: 'program',
    meta: { title: '项目管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/program/table/index'),
        meta: { title: '项目列表', icon: 'table' }
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/program/form/index'),
        meta: { title: '新增项目', icon: 'tree' }
      }
    ]
  },

  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/table',
    name: 'notice',
    meta: { title: '公告管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/notice/table/index'),
        meta: { title: '公告列表', icon: 'table' }
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/notice/form/index'),
        meta: { title: '新增公告', icon: 'tree' }
      }
    ]
  },

  {
    path: '/leave-message',
    component: Layout,
    redirect: '/notice/table',
    name: 'leave-message',
    meta: { title: '留言管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/leave-message/table/index'),
        meta: { title: '留言列表', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
