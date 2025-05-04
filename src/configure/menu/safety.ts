export default {
  path: '/safety',
  name: 'safety',
  parentPath: '/',
  redirect: '/safety/mandatory',
  icon: '',
  order: 70,
  children: [
    {
      path: 'mandatory',
      name: 'mandatory',
      parentPath: '/safety',
      icon: '',
    },
    {
      path: 'rule',
      name: 'rule',
      parentPath: '/safety',
      icon: '',
    },
    {
      path: 'secret',
      name: 'secret',
      parentPath: '/safety',
      icon: '',
    },
  ],
}
