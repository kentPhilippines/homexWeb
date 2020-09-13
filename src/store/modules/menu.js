import { constantRoutes } from '../../router/router'

const menu = {
	state: {
		path: '',
		siderMenus: []
	},
	mutations: {
		setPath: (state, path) => {
			state.path = path
		},
		setMenus: (state, menus) => {
			state.siderMenus = menus
			const accessedRoutes = filterAsyncRouter(menus)
			constantRoutes.concat(accessedRoutes)
		}
	},
	actions: {
	}
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Main') {
        route.component = RouteView
      } else {
        route.component = loadView(route.component)
      }
    }

    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  console.log(`@/pages${view}`);
  return () => import(`@/pages${view}`)
}

export default menu;