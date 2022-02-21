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
    hidden: true,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: 'Dashboard',
          icon: 'dashboard'
        }
      },
      {
        path: 'requestdealer',
        name: 'requestdealer',
        component: () => import('@/views/dealer/requestdealer/index'),
        meta: {
          title: '申请资料',
          icon: 'dashboard'
        }
      }
    ]
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
  {
    path: '/user',
    component: Layout,
    name: 'user',
    redirect: '/user/authorize',
    meta: {
      title: '用户中心',
      icon: 'example'
    },
    children: [
      {
        path: 'authorize',
        name: 'authorize',
        component: () => import('@/views/user/authorize/index'),
        meta: {
          title: '我的授权记录',
          icon: 'tree'
        }
      },
      {
        path: 'bindmachine',
        name: 'bindmachine',
        component: () => import('@/views/user/bindmachine/index'),
        meta: {
          title: '我的绑定记录',
          icon: 'tree'
        }
      }
    ]
  },
  {
    path: '/media',
    component: Layout,
    name: 'media',
    redirect: '/media/uploadmovie',
    meta: {
      title: '媒体库',
      icon: 'example'
    },
    children: [
      {
        path: 'uploadmovie',
        name: 'uploadmovie',
        component: () => import('@/views/media/uploadmovie/index'),
        meta: {
          title: '上传视频',
          icon: 'tree'
        }
      },
      {
        path: 'usermedia',
        name: 'usermedia',
        component: () => import('@/views/media/usermedia/index'),
        meta: {
          title: '我的视频',
          icon: 'tree'
        }
      },
      {
        path: 'usermediaset',
        name: 'usermediaset',
        component: () => import('@/views/media/usermediaset/index'),
        meta: {
          title: '配置策略',
          icon: 'tree'
        }
      }
    ]
  },
  {
    path: '/smartwall',
    component: Layout,
    name: 'smartwall',
    redirect: '/smartwall/listwall',
    meta: {
      title: '智慧墙',
      icon: 'example'
    },
    children: [
      {
        path: 'listwall',
        name: 'listwall',
        component: () => import('@/views/editor/list/index'),
        meta: {
          title: '我的模板',
          icon: 'tree'
        }
      },
      {
        path: 'editwall',
        name: 'editwall',
        component: () => import('@/views/editor/edit/index'),
        meta: {
          title: 'H5编辑器',
          icon: 'tree'
        },
        hidden: true
      }
    ]
  }
]

// 用户 权限 1
export const asyncRoutes1 = []

// 经销商 权限 2
export const asyncRoutes2 = [
  {
    path: '/dealer',
    component: Layout,
    name: 'dealer',
    meta: {
      title: '报备系统',
      icon: 'example'
    },
    children: [
      {
        path: 'purchase',
        name: 'purchase',
        component: () => import('@/views/dealer/purchase/index'),
        meta: {
          title: '在线报备',
          icon: 'tree'
        }
      },
      {
        path: 'purchaseorder',
        name: 'purchaseorder',
        component: () => import('@/views/dealer/purchaseorder/index'),
        meta: {
          title: '报备记录',
          icon: 'tree'
        }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: 'order',
    meta: {
      title: '绑定管理',
      icon: 'example'
    },
    children: [
      {
        path: 'authoriseorder',
        name: 'authoriseorder',
        component: () => import('@/views/order/authoriseorder/index'),
        meta: {
          title: '分发授权',
          icon: 'tree'
        }
      },
      {
        path: 'authoriseorderlog',
        name: 'authoriseorderlog',
        component: () => import('@/views/order/authoriseorderlog/index'),
        meta: {
          title: '授权记录',
          icon: 'tree'
        }
      }
    ]
  }
]

// 审批人员 4
export const asyncRoutes4 = [
  {
    path: '/approve',
    component: Layout,
    name: 'approve',
    meta: {
      title: '审批',
      icon: 'example'
    },
    children: [
      {
        path: 'processdealerrequest',
        name: 'processdealerrequest',
        component: () => import('@/views/approve/processdealerrequest/index'),
        meta: {
          title: '资质审批',
          icon: 'tree'
        }
      },
      {
        path: 'processpurchase',
        name: 'processpurchase',
        component: () => import('@/views/approve/processpurchase/index'),
        meta: {
          title: '采购审批',
          icon: 'tree'
        }
      }
    ]
  }
]

// 资源管理 rights 8
export const asyncRoutes8 = [
  {
    path: '/adminstore',
    redirect: '/adminstore/upload',
    component: Layout,
    meta: {
      title: '资源管理',
      icon: 'example'
    },
    children: [
      {
        path: 'wxapp',
        name: 'wxapp',
        component: () => import('@/views/adminstore/wxapp/index'),
        meta: {
          title: '小程序',
          icon: 'table'
        }
      },
      {
        path: 'upload',
        name: 'Upload',
        component: () => import('@/views/adminstore/upload/index'),
        meta: {
          title: '资源上传',
          icon: 'tree'
        }
      },
      {
        path: 'listitem',
        name: 'Listitem',
        component: () => import('@/views/adminstore/listitem/index'),
        meta: {
          title: '资源编辑',
          icon: 'table'
        }
      }
    ]
  },
  {
    path: '/djplate',
    component: Layout,
    name: 'djplate',
    redirect: '/djplate/uploadplate',
    meta: {
      title: '小组件面板',
      icon: 'example'
    },
    children: [
      {
        path: 'uploadplate',
        name: 'uploadplate',
        component: () => import('@/views/djplate/uploadplate/index'),
        meta: {
          title: '上传资源',
          icon: 'tree'
        }
      },
      {
        path: 'platelist',
        name: 'platelist',
        component: () => import('@/views/djplate/platelist/index'),
        meta: {
          title: '我的资源',
          icon: 'tree'
        }
      }
    ]
  }
]

export const asyncRoutes16 = []

export const asyncRoutes32 = []

export const asyncRoutes64 = []

export const asyncRoutes128 = []

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
