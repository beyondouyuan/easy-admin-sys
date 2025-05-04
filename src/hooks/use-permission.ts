import { ref } from 'vue'
import useMenus from './use-menus'
import useRoutes from './use-routes'

// menu to router
function menus2Routes(menus: any[]) {
  return useRoutes(menus)
}

export default function usePermission() {
  const token = ref()
  const { menus } = useMenus()
  const routes = menus2Routes(menus.value)
  return {
    token,
    menus,
    routes,
  }
}
