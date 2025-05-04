export default {
  path: '/billing',
  name: 'billing',
  parentPath: '/',
  redirect: '/billing/standard',
  icon: '',
  order: 60,
  children: [
    {
      path: 'standard',
      name: 'standard',
      parentPath: '/billing',
      icon: '',
    },
    {
      path: 'rule',
      name: 'rule',
      parentPath: '/billing',
      icon: '',
    },
  ],
}
