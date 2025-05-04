import router from '@/router'
import usePermission from '@/hooks/use-permission'
let isRoutesAdded = false

export function setupPermission() {
  router.beforeEach(async (to, from, next) => {
    // 2. 如果已添加过路由，直接放行
    if (isRoutesAdded) {
      return next()
    }

    try {
      const { routes } = usePermission()
      await addRoutes(router, routes)
      // console.log('routes', router.getRoutes())
      isRoutesAdded = true
      return next({ ...to, replace: true })
    } catch (error) {
      console.error('[路由错误]', error)
    }
    next()
  })
}

function addRoutes(router: any, routes: any[]) {
  return new Promise((resolve, reject) => {
    for (const route of routes) {
      router.addRoute(route)
    }
    resolve({})
  })
}
