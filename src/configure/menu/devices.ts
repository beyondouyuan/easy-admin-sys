export default {
  path: '/devices',
  name: 'devices',
  parentPath: '/',
  redirect: '/devices/list',
  icon: '',
  order: 30,
  children: [
    {
      path: 'list',
      name: 'list',
      parentPath: '/devices',
      icon: '',
    },
    {
      path: 'group',
      name: 'group',
      parentPath: '/devices',
      icon: '',
    },
    {
      path: 'model',
      name: 'model',
      parentPath: '/devices',
      icon: '',
    },
    {
      path: 'auth',
      name: 'auth',
      parentPath: '/devices',
      icon: '',
    },
  ],
}
