export default {
  path: '/billing',
  name: 'billing',
  parentPath: '/',
  redirect: '/billing/standard',
  icon: '',
  menu: true,
  order: 60,
  children: [
    {
      path: 'standard',
      name: 'standard',
      parentPath: '/billing',
      icon: '',
      menu: true,
    },
    {
      path: 'rule',
      name: 'rule',
      parentPath: '/billing',
      icon: '',
      menu: true,
    },
  ],
}
