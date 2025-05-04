const modules = import.meta.glob(['@/views/**/*.vue', '!/**/components/**'])

import Layout from '@/layout/index.vue'

const _import = (view?: string) => {
  const key = `/src/views/${view}/index.vue`
  const module = modules[key]
  if (!module) {
    console.error(`Component not found: ${key}`)
    return undefined
  }
  return module
}

function ensureParent(path: string) {
  if (typeof path !== 'string') return ''
  return path.startsWith('/') ? path.slice(1) : path
}

function ensureView(item: any) {
  const { parentPath, name, root, rootChild, children = [] } = item
  let view = name
  if (root || children?.length) {
    view = null
  } else if (rootChild) {
    view = ensureParent(parentPath)
  } else {
    view = `${ensureParent(parentPath)}/${name}`
  }
  return view
}

function ensurePathName(name: string) {
  return name.replace(/^./, (match) => match.toUpperCase())
}

export default function useRoutes(menus: any[], level: number = 0) {
  return menus.map((item, idx) => {
    const view = ensureView(item)
    const name = ensurePathName(item.name)
    const parent = ensureParent(item.parentPath)
    const route: any = {
      ...item,
      name: item.parentPath !== '/' ? `${ensurePathName(parent)}${name}` : name,
      level,
      meta: {
        title: item.title,
      },
      component: view ? _import(view) : level ? undefined : Layout,
    }

    delete route['parentPath']
    delete route['order']

    // 如果有子菜单，递归处理
    if (item.children && item.children.length > 0) {
      route.children = useRoutes(item.children, level + 1)
    }

    return route
  })
}
