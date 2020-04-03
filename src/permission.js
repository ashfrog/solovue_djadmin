import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
// import { asyncRoutes } from '@/router'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
// var bloaded = false

router.beforeEach(async(to, from, next) => {
  // start progress bar
  // NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else {
      const userinfo = store.state.user // store.getters.name
      if (userinfo.rights === -1) {
        // 获取用户权限
        var rights = {}
        await store.dispatch('user/getInfo', userinfo).then(result => {
          rights = result.rights
        })
        console.log(rights, 'rights')
        const accessRoutes = await store.dispatch('permission/generateRoutes', rights)
        router.addRoutes(accessRoutes)
        next(`/login`)
      } else {
        next()
      }
      // else {
      //   try {
      //     // get user info
      //     console.log("dispatch('user/getInfo')")
      //     await store.dispatch('user/getInfo')
      //     console.log(store.state.user, 'store.state.user')
      //     const { roles } = await store.dispatch('user/getInfo')
      //     const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
      //     router.addRoutes(accessRoutes)
      //     next({ ...to, replace: true })

      //     // next()
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     console.log('router-error:', error)
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     // NProgress.done()
      //   }
      // }
    }
  } else {
    /* has no token*/
    console.log('notocken')
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
