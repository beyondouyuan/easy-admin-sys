export default {
  path: '/devices',
  name: 'devices',
  parentPath: '/',
  redirect: '/devices/list',
  icon: '',
  menu: true,
  order: 30,
  children: [
    {
      path: 'list',
      name: 'list',
      parentPath: '/devices',
      icon: '',
      menu: true,
    },
    {
      path: 'group',
      name: 'group',
      parentPath: '/devices',
      icon: '',
      menu: true,
    },
    {
      path: 'model',
      name: 'model',
      parentPath: '/devices',
      icon: '',
      menu: true,
    },
    {
      path: 'auth',
      name: 'auth',
      parentPath: '/devices',
      icon: '',
      menu: true,
    },
  ],
}
