import {
  constantRoutes,
  asyncRoutes1,
  asyncRoutes2,
  asyncRoutes4,
  asyncRoutes8,
  asyncRoutes16,
  asyncRoutes32,
  asyncRoutes64,
  asyncRoutes128,
  async404
} from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }

      var accessedRoutes = []
      console.log('roles', roles)
      if (roles & 1) {
        accessedRoutes = accessedRoutes.concat(asyncRoutes1)
      }
      if (roles & 2) {
        accessedRoutes = accessedRoutes.concat(asyncRoutes2)
      }
      if (roles & 4) {
        accessedRoutes = accessedRoutes.concat(asyncRoutes4)
      }
      if (roles & 8) {
        accessedRoutes = accessedRoutes.concat(asyncRoutes8)
      }
      if (roles & 16) {
        accessedRoutes = accessedRoutes.concat(asyncRoutes16)
      }
      if (roles & 32) {
        accessedRoutes = accessedRoutes.concat(asyncRoutes32)
      }
      if (roles & 64) {
        accessedRoutes = accessedRoutes.concat(asyncRoutes64)
      }
      if (roles & 128) {
        accessedRoutes = accessedRoutes.concat(asyncRoutes128)
      }
      accessedRoutes.concat(async404)

      console.log(accessedRoutes, 'accessedRoutes')

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
