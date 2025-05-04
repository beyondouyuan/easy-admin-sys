export default {
  path: '/system',
  name: 'system',
  parentPath: '/',
  redirect: '/system/log',
  icon: '',
  order: 80,
  children: [
    {
      path: 'log',
      name: 'log',
      parentPath: '/system',
      icon: '',
    },
    {
      path: 'params',
      name: 'params',
      parentPath: '/system',
      icon: '',
    },
    {
      path: 'menu',
      name: 'menu',
      parentPath: '/system',
      icon: '',
    },
    {
      path: 'mail',
      name: 'mail',
      parentPath: '/system',
      icon: '',
    },
    {
      path: 'customization',
      name: 'customization',
      parentPath: '/system',
      icon: '',
    },
    {
      path: 'authorization',
      name: 'authorization',
      parentPath: '/system',
      icon: '',
    },
  ],
}
