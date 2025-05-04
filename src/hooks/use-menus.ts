import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'

const packages = import.meta.glob(`@/configure/menu/**.ts`, {
  eager: true,
  import: 'default',
})

const modules = Object.keys(packages).reduce((acc: { order: number }[], path: string) => {
  const file = packages[path] as { default?: { order: number }; order?: number }
  const content = file.default || file
  if (content.order !== undefined) {
    acc.push(content as { order: number })
  }
  return acc.sort((a: { order: number }, b: { order: number }) => a.order - b.order)
}, [])

function ensureParent(path: string) {
  if (typeof path !== 'string') return ''
  return path.startsWith('/') ? path.slice(1) : path
}

function ensurePathName(name: string) {
  return name.replace(/^./, (match) => match.toUpperCase())
}

function ensureTitle(item: any, level: number) {
  const { parentPath, name, menu, children = [] } = item
  const dim = ensureParent(parentPath)
  let title = ''
  if (level === 0) {
    title = children.length ? `route.${name}.title` : `route.${name}`
  } else {
    if (children.length > 0) {
      title = `route.${dim.split('/').join('.')}.${name}.title`
    } else {
      title = menu
        ? `route.${dim.split('/').join('.')}.${name}`
        : `route.${dim.split('/').join('.')}${ensurePathName(name)}`
    }
  }
  return title
}

function resolveMenus(menus: any, level = 0) {
  return menus.map((item: any) => {
    const menu: any = {
      ...item,
      level,
      title: ensureTitle(item, level),
    }
    if (item.root && !item?.children?.length) {
      // 构造一个子菜单，以便用于处理菜单 & layout
      menu.children = [
        {
          path: '',
          name: `${item.name}Child`,
          parentPath: item.path,
          icon: item.icon,
          rootChild: true,
          title: ensureTitle(item, level),
        },
      ]
    }
    // 如果有子菜单，递归处理
    if (item.children && item.children.length > 0) {
      menu.children = resolveMenus(item.children, level + 1)
    }
    return menu
  })
}

function useMenus() {
  // TODO request from api
  const data = cloneDeep(modules)
  const menus = ref<any>([])
  menus.value = resolveMenus(data)
  return {
    menus,
  }
}

export default useMenus
