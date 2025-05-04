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

function ensureMenus(items: any[]) {
  return items.filter((item) => {
    if (item.menu === false) return false

    if (item.children) {
      item.children = ensureMenus(item.children)
      // Keep the parent if it has menu:true OR if it has children after filtering
      return item.menu === true || item.children.length > 0
    }

    return item.menu === true
  })
}

export function useSidebars(menus: any[]) {
  return ensureMenus(menus)
}
