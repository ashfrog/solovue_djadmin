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
    icon: 'svg-name'             the icon show in the sidebar
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
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/findpassword',
    component: () => import('@/views/findpassword/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  {
    path: '/user',
    component: Layout,
    name: 'user',
    redirect: '/user/orderlist',
    meta: { title: '用户中心', icon: 'example' },
    children: [
      {
        path: 'orderlist',
        name: 'orderlist',
        component: () => import('@/views/user/orderlist/index'),
        meta: { title: '购买记录', icon: 'tree' }
      },
      {
        path: 'bindmachine',
        name: 'bindmachine',
        component: () => import('@/views/user/bindmachine/index'),
        meta: { title: '绑定记录', icon: 'tree' }
      }
    ]
  }
]

// 用户 1
export const asyncRoutes1 = [
  // 404 page must be placed at the end !!!
  // {
  //   path: '/adminstore',
  //   component: Layout,
  //   meta: { title: '商店管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'listitem',
  //       name: 'Listitem',
  //       component: () => import('@/views/store/listitem/index'),
  //       meta: { title: '资源管理', icon: 'table' }
  //     },
  //     {
  //       path: 'upload',
  //       name: 'Upload',
  //       component: () => import('@/views/store/upload/index'),
  //       meta: { title: '资源上传', icon: 'tree' }
  //     }
  //   ]
  // },
]

// 经销商 2
export const asyncRoutes2 = [
  {
    path: '/dealer',
    component: Layout,
    name: 'dealer',
    meta: { title: '管理项目', icon: 'example' },
    children: [
      {
        path: 'dealerlist',
        name: 'dealerlist',
        component: () => import('@/views/dealer/orderlist/index'),
        meta: { title: '我的项目', icon: 'tree' }
      },
      {
        path: 'dealerbindmachine',
        name: 'dealerbindmachine',
        component: () => import('@/views/user/bindmachine/index'),
        meta: { title: '绑定记录', icon: 'tree' }
      }
    ]
  }
]

// 经销商管理人员 4
export const asyncRoutes4 = [
  {
    path: '/admin',
    component: Layout,
    name: 'admin',
    meta: { title: '订单管理', icon: 'example' },
    children: [
      {
        path: 'adminaddorder',
        name: 'adminaddorder',
        component: () => import('@/views/user/addorder/index'),
        meta: { title: '添加订单', icon: 'table' }
      },
      {
        path: 'adminorderlist',
        name: 'adminorderlist',
        component: () => import('@/views/user/orderlist/index'),
        meta: { title: '订单浏览', icon: 'tree' }
      },
      {
        path: 'adminbindmachine',
        name: 'adminbindmachine',
        component: () => import('@/views/user/bindmachine/index'),
        meta: { title: '绑定记录', icon: 'tree' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 资源编辑人员 rights 8
export const asyncRoutes8 = [
  {
    path: '/adminstore/',
    component: Layout,
    meta: { title: '', icon: 'example' },
    children: [
      {
        path: 'listitem',
        name: 'Listitem',
        component: () => import('@/views/adminstore/listitem/index'),
        meta: { title: '资源管理', icon: 'table' }
      }
    ]
  }
]

// 资源上传人员 rights 16
export const asyncRoutes16 = [
  {
    path: '/adminstore',
    redirect: '/adminstore/upload',
    component: Layout,
    meta: { title: '', icon: 'example' },
    children: [
      {
        path: 'upload',
        name: 'Upload',
        component: () => import('@/views/adminstore/upload/index'),
        meta: { title: '资源上传', icon: 'tree' }
      }
    ]
  }
]

export const asyncRoutes32 = [
]
export const asyncRoutes64 = [
]
export const asyncRoutes128 = [
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
